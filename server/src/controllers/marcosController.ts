// src/server/controllers/marcosController.ts

import { RequestHandler } from 'express'
import { PrismaClient, DetGroup, Sex, ProgrammingLanguage } from '@prisma/client'
import { stringify } from 'csv-stringify/sync'

const prisma = new PrismaClient()

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
 */
export const createEntry: RequestHandler = async (req, res, next) => {
  try {
    const {
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

    console.log("Got CreateEntry request with body" + JSON.stringify(req.body, null, 2))

    if (!Object.values(DetGroup).includes(rawGroup)) {
      res.status(400).json({ error: `Invalid group: ${rawGroup}` })
      return
    }
    const groupEnum = rawGroup as DetGroup

    const entry = await prisma.marcos_Data.create({
      data: {
        yearsProgramming: parsedYears,
        age:               parsedAge,
        sex:               sexEnum,
        language:          langEnum,
        email,
        accuracy:          typeof accuracy === 'string' ? parseFloat(accuracy) : accuracy,
        task_accuracy,
        durationMs:        durationMs,
        group:             groupEnum,
      },
    })

    console.log("Returning " + JSON.stringify(entry, null, 2))
    // <— send response without returning it
    res.status(201).json(entry)
  } catch (err) {
    console.error('❌ Error in createEntry:', err)
    next(err)  // next() returns void
  }
}

/**
 * GET /next-group
 */



export const getNextGroup: RequestHandler = async (_req, res, next) => {
  try {
    const ACTIVE_GROUPS: DetGroup[] = [
      DetGroup.AngleBracket,
      DetGroup.Backslash,
      DetGroup.TemplateLiteral,
    ];
    
    console.log("Got request to getNextGroup");

    const chosenGroup: DetGroup = await prisma.$transaction(async tx => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(42)`;

      // counts for every group that has at least one row
      const counts = await tx.marcos_Data.groupBy({
        by: ['group'],
        _count: { group: true },
      });

      // start every ACTIVE group at zero
      const countsMap = Object.fromEntries(
        ACTIVE_GROUPS.map(g => [g, 0]),
      ) as Record<DetGroup, number>;

      // fill in the actual counts we just fetched
      counts.forEach(c => {
        if (ACTIVE_GROUPS.includes(c.group as DetGroup)) {
          countsMap[c.group as DetGroup] = c._count.group;
        }
      });

      // balance only among ACTIVE groups
      const minCount = Math.min(...ACTIVE_GROUPS.map(g => countsMap[g]));
      const candidates = ACTIVE_GROUPS.filter(g => countsMap[g] === minCount);

      return candidates[Math.floor(Math.random() * candidates.length)];
    });

    console.log("returning " + chosenGroup);
    res.json({ group: chosenGroup });
  } catch (err) {
    console.error("❌ Error in getNextGroup:", err);
    next(err);
  }
};

/**
 * GET /
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
