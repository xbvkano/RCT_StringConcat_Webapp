// src/server/controllers/kushaController.ts
import { RequestHandler } from 'express'
import { PrismaClient, Sex, ProgrammingLanguage } from '@prisma/client'
import cron from 'node-cron'
import { stringify } from 'csv-stringify/sync'

const prisma = new PrismaClient()

// Every minute, delete any Assignment_kusha older than 30m that never completed
cron.schedule('*/1 * * * *', async () => {
  const cutoff = new Date(Date.now() - 30 * 60 * 1000)
  try {
    const { count } = await prisma.assignment_kusha.deleteMany({
      where: {
        completed: false,
        createdAt: { lt: cutoff },
      },
    })
    if (count > 0) {
      console.log(`🗑 Deleted ${count} expired assignments`)
    }
  } catch (err) {
    console.error('Error deleting expired assignments:', err)
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
 * POST /kusha
 * Creates a Kusha_Data entry and marks its Assignment_kusha completed.
 */
/**
 * POST /kusha
 * Creates a Kusha_Data entry (including group) and marks its Assignment_kusha completed.
 */
export const createEntry: RequestHandler = async (req, res, next) => {
    try {
      const {
        assignmentId,
        group: groupRaw,
        yearsProgramming,
        age,
        sex: sexInput,
        language: languageInput,
        email,
        task_accuracy,
        durations,
        totalTime,
        overallAccuracy,
      } = req.body as Record<string, any>
  
      if (assignmentId == null) {
        res.status(400).json({ error: 'Missing assignmentId' })
        return
      }
      if (groupRaw == null) {
        res.status(400).json({ error: 'Missing group' })
        return
      }
  
      const experienceYears = parseInt(yearsProgramming, 10) || 0
      const safeAge        = parseInt(age, 10) || 0
      const sexEnum        = parseSex(sexInput)
      const langEnum       = parseLang(languageInput)
  
      const entry = await prisma.$transaction(async (tx) => {
        const created = await tx.kusha_Data.create({
          data: {
            group:           String(groupRaw),
            experience_years: experienceYears,
            age:             safeAge,
            sex:             sexEnum,
            language:        langEnum,
            email:           email || null,
            accuracy:        overallAccuracy ?? 0,
            task_accuracy:   task_accuracy,
            total_time:      totalTime ?? 0,
            per_task_time:   durations,
          },
        })
  
        await tx.assignment_kusha.update({
          where: { id: assignmentId },
          data: { completed: true },
        })
  
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
 * Return { group, assignmentId } balancing between groups 0 and 1.
 */
export const getNextGroup: RequestHandler = async (_req, res, next) => {
  try {
    // count completed assignments per group
    const [count0, count1] = await Promise.all([
      prisma.assignment_kusha.count({ where: { group: 0, completed: true } }),
      prisma.assignment_kusha.count({ where: { group: 1, completed: true } }),
    ])

    let group: number
    if (count0 === count1) {
      group = Math.random() < 0.5 ? 0 : 1
    } else {
      group = count0 < count1 ? 0 : 1
    }

    // create a fresh assignment
    const assignment = await prisma.assignment_kusha.create({
      data: { group, completed: false },
    })

    res.json({ group, assignmentId: assignment.id })
  } catch (err) {
    console.error('❌ Error in getNextGroup:', err)
    next(err)
  }
}

/**
 * GET /kusha/:id
 * Fetch a single Kusha_Data entry by ID.
 */
export const getEntryById: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' })
      return
    }
    const entry = await prisma.kusha_Data.findUnique({ where: { id } })
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
 * GET /kusha
 * Download CSV of all Kusha_Data entries.
 */
export const getAllEntriesCsv: RequestHandler = async (_req, res, next) => {
  try {
    const data = await prisma.kusha_Data.findMany()
    const csv  = stringify(data, { header: true })
    res
      .status(200)
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="kusha_data.csv"')
      .send(csv)
  } catch (err) {
    console.error('❌ Error in getAllEntriesCsv:', err)
    next(err)
  }
}
