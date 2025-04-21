// src/server/controllers/marcosController.ts

import { RequestHandler } from 'express'
import { PrismaClient, DetGroup, Sex, ProgrammingLanguage } from '@prisma/client'
import cron from 'node-cron'
import { stringify } from 'csv-stringify/sync'

const prisma = new PrismaClient()

// Every minute, clean up assignments older than 20 minutes that never completed
cron.schedule('*/1 * * * *', async () => {
  try {
    const cutoff = new Date(Date.now() - 30 * 60 * 1000)
    const { count } = await prisma.assignment.deleteMany({
      where: {
        completed: false,
        createdAt: { lt: cutoff },
      },
    })
    if (count > 0) {
      console.log(`🗑  Cleaned up ${count} abandoned assignments (older than 20m)`)
    }
  } catch (err) {
    console.error('Error cleaning up abandoned assignments:', err)
  }
})

function parseSex(input: string): Sex {
  switch (input.toLowerCase()) {
    case 'male':   return Sex.male
    case 'female': return Sex.female
    case 'other':  return Sex.other
    default:
      throw new Error(`Invalid sex: ${input}`)
  }
}

function parseLang(input: string): ProgrammingLanguage {
  switch (input.toLowerCase()) {
    case 'cpp':
    case 'c++':        return ProgrammingLanguage.cpp
    case 'java':       return ProgrammingLanguage.java
    case 'csharp':
    case 'c#':         return ProgrammingLanguage.csharp
    case 'js':
    case 'javascript': return ProgrammingLanguage.js
    case 'ts':
    case 'typescript': return ProgrammingLanguage.ts
    case 'python':     return ProgrammingLanguage.python
    default:           return ProgrammingLanguage.other
  }
}

/**
 * POST /
 * Handles survey + experiment submission. Expects assignmentId for balancing.
 */
export const createEntry: RequestHandler = async (req, res, next) => {
  try {
    const {
      assignmentId,
      yearsProgramming,
      age,
      sex: sexInput,
      language: languageInput,
      email,
      accuracy,
      task_accuracy,
      durationMs,
      group: rawGroup,
    } = req.body as Record<string, any>

    const parsedYears = parseInt(yearsProgramming, 10)
    const parsedAge   = parseInt(age, 10)
    const sexEnum     = parseSex(sexInput)
    const langEnum    = parseLang(languageInput)

    if (!Object.values(DetGroup).includes(rawGroup)) {
      res.status(400).json({ error: `Invalid group: ${rawGroup}` })
      return
    }
    const groupEnum = rawGroup as DetGroup

    console.log('📥 Creating entry with:', { yearsProgramming, age, sexEnum, langEnum, email, accuracy, task_accuracy, durationMs, groupEnum, assignmentId })

    const entry = await prisma.$transaction(async tx => {
      // insert experiment result
      const created = await tx.marcos_Data.create({
        data: {
          yearsProgramming: parsedYears,
          age:               parsedAge,
          sex:               sexEnum,
          language:          langEnum,
          email,
          accuracy:          typeof accuracy === 'string' ? parseFloat(accuracy) : accuracy,
          task_accuracy,
          durationMs,
          group:             groupEnum,
        },
      })

      // mark assignment completed
      if (assignmentId) {
        await tx.assignment.update({
          where: { id: assignmentId },
          data: { completed: true },
        })
      }

      return created
    })

    res.status(201).json(entry)
  } catch (err) {
    console.error('❌ Error in createEntry:', err)
    next(err)
  }
}

/**
 * GET /next-group
 * Reserves a slot by inserting into Assignment.
 */
export const getNextGroup: RequestHandler = async (_req, res, next) => {
  try {
    const ACTIVE_GROUPS: DetGroup[] = [
      DetGroup.AngleBracket,
      DetGroup.Backslash,
      DetGroup.TemplateLiteral,
    ]
    console.log('🔄 getNextGroup called')

    const { chosenGroup, assignmentId } = await prisma.$transaction(async tx => {
      // ensure single concurrent access
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(42)`

      // count only completed assignments for balance
      const counts = await tx.assignment.groupBy({
        by: ['group'],
        _count: { group: true },
      })

      console.log("Counts: " + JSON.stringify(counts))

      // build a map of counts
      const countMap: Record<DetGroup, number> = Object.fromEntries(
        ACTIVE_GROUPS.map(g => [g, 0])
      ) as Record<DetGroup, number>

      counts.forEach(c => {
        const g = c.group as DetGroup
        if (ACTIVE_GROUPS.includes(g)) countMap[g] = c._count.group
      })

      const minCount = Math.min(...ACTIVE_GROUPS.map(g => countMap[g]))
      const candidates = ACTIVE_GROUPS.filter(g => countMap[g] === minCount)
      const idx = Math.floor(Math.random() * candidates.length)
      const chosen = candidates[idx]
      console.log("Chosen group: " + chosen)
      // reserve slot
      const { id } = await tx.assignment.create({ data: { group: chosen } })

      return { chosenGroup: chosen, assignmentId: id }
    })

    res.json({ group: chosenGroup, assignmentId })
  } catch (err) {
    console.error('❌ Error in getNextGroup:', err)
    next(err)
  }
}

/**
 * GET /:id
 */
export const getEntryById: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' })
      return
    }
    const entry = await prisma.marcos_Data.findUnique({ where: { id } })
    if (!entry) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.json(entry)
  } catch (err) {
    console.error('❌ Error in getEntryById:', err)
    next(err)
  }
}

/**
 * GET /
 * Download CSV of all results
 */
export const getAllEntriesCsv: RequestHandler = async (_req, res, next) => {
  try {
    const data = await prisma.marcos_Data.findMany()
    const csv  = stringify(data, { header: true })
    res
      .status(200)
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="marcos_data.csv"')
      .send(csv)
  } catch (err) {
    console.error('❌ Error in getAllEntriesCsv:', err)
    next(err)
  }
}
