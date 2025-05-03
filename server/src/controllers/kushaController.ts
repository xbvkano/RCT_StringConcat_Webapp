// src/server/controllers/kushaController.ts

import { RequestHandler } from 'express'
import { PrismaClient, Sex, ProgrammingLanguage } from '@prisma/client'
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
 * Handles survey + experiment submission for Kusha_data (no assignmentIds).
 */
export const createKushaEntry: RequestHandler = async (req, res, next) => {

  console.log('📥 Received Kusha entry:', req.body)

  try {
    const {
      yearsProgramming,
      age,
      sex: sexInput,
      language: languageInput,
      email,
      ids,
      task_accuracy,
      durations,
      totalTime,
      overallAccuracy,
    } = req.body as Record<string, any>

    const parsedExperienceYears = parseInt(yearsProgramming, 10)
    const parsedAge = parseInt(age, 10)

    const experienceYears = isNaN(parsedExperienceYears) ? 0 : parsedExperienceYears
    const safeAge = isNaN(parsedAge) ? 0 : parsedAge

    const sexEnum = parseSex(sexInput)
    const langEnum = parseLang(languageInput)

    console.log('📥 Creating Kusha entry with:', {
      experienceYears,
      safeAge,
      sexEnum,
      langEnum,
      email,
      ids,
      task_accuracy,
      durations,
      totalTime,
      overallAccuracy,
    })

    const entry = await prisma.$transaction(async tx => {
      // create the main user record
      const created = await tx.kusha_data.create({
        data: {
          experience_years: experienceYears,
          age: safeAge,
          sex: sexEnum,
          language: langEnum,
          email: email || null,
          accuracy: overallAccuracy ?? 0,
          task_accuracy,
          task_ids: ids,
          total_time: totalTime ?? 0,
          per_task_time: durations,
        },
      })

      // insert per-question rows
      const perQuestionData = ids.map((questionId: string, index: number) => ({
        question_id: parseInt(questionId, 10),
        user_id: created.id,
        result: task_accuracy[index],
        time: durations[index],
      }))

      await tx.kusha_per_question.createMany({
        data: perQuestionData,
      })

      return created
    })

    res.status(201).json(entry)
  } catch (err) {
    console.error('❌ Error in createKushaEntry:', err)
    next(err)
  }
}

/**
 * GET /:id
 * Retrieve a single Kusha_data entry by its ID.
 */
export const getKushaEntryById: RequestHandler = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10)
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' })
      return
    }
    const entry = await prisma.kusha_data.findUnique({ where: { id } })
    if (!entry) {
      res.status(404).json({ error: 'Not found' })
      return
    }
    res.json(entry)
  } catch (err) {
    console.error('❌ Error in getKushaEntryById:', err)
    next(err)
  }
}

/**
 * GET /
 * Download CSV of all Kusha_data results.
 */
export const getAllKushaEntriesCsv: RequestHandler = async (_req, res, next) => {
  try {
    const data = await prisma.kusha_data.findMany()
    const csv  = stringify(data, { header: true })
    res
      .status(200)
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename="kusha_data.csv"')
      .send(csv)
  } catch (err) {
    console.error('❌ Error in getAllKushaEntriesCsv:', err)
    next(err)
  }
}
