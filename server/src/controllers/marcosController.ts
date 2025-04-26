// src/server/controllers/marcosController.ts

import { RequestHandler } from 'express'
import { PrismaClient, Sex, ProgrammingLanguage } from '@prisma/client'
import cron from 'node-cron'
import { stringify } from 'csv-stringify/sync'

const prisma = new PrismaClient()

// Every minute, clean up assignments older than 30 minutes that never completed
cron.schedule('*/1 * * * *', async () => {
  try {
    const cutoff = new Date(Date.now() - 1 * 60 * 1000)
    const { count } = await prisma.assignment.updateMany({
      where: {
        completed: false,
        abandoned: false,
        createdAt: { lt: cutoff },
      },
      data: {
        abandoned: true,
      },
    });
    if (count > 0) {
      console.log(`🗑  Cleaned up ${count} abandoned assignments (older than 30m)`)
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
      ids,
      task_accuracy,
      durations,
      totalTime,
      overallAccuracy,
    } = req.body as Record<string, any>;

    if (!assignmentId) {
      res.status(400).json({ error: 'Missing assignmentId' });
      return;
    }

    const parsedExperienceYears = parseInt(yearsProgramming, 10);
    const parsedAge = parseInt(age, 10);

    const experienceYears = isNaN(parsedExperienceYears) ? 0 : parsedExperienceYears;
    const safeAge = isNaN(parsedAge) ? 0 : parsedAge;

    const sexEnum = parseSex(sexInput);            // must map to 'male' | 'female' | 'other'
    const langEnum = parseLang(languageInput);      // must map to 'cpp' | 'java' | 'ts' etc

    console.log('📥 Creating entry with:', {
      assignmentId,
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
    });

    const entry = await prisma.$transaction(async (tx) => {
      const created = await tx.marcos_Data.create({
        data: {
          experience_years: experienceYears,
          age: safeAge,
          sex: sexEnum,
          language: langEnum,
          email,
          accuracy: overallAccuracy ?? 0,
          task_accuracy,
          total_time: totalTime ?? 0,
          per_task_time: durations,
        },
      });

      await tx.assignment.update({
        where: { id: assignmentId },
        data: { completed: true },
      });

      return created;
    });

    res.status(201).json(entry);
  } catch (err) {
    console.error('❌ Error in createEntry:', err);
    next(err);
  }
};
 

export const getNextGroup: RequestHandler = async (req, res, next) => {
  try {
    const question_size_raw = req.query.question_size;
    const syntax_size_raw = req.query.syntax_size;
    const group_id_raw = req.query.group_id;

    const question_size = Number(question_size_raw);
    const syntax_size = Number(syntax_size_raw);
    const group_id = Number(group_id_raw);

    if (
      !question_size_raw || !syntax_size_raw || !group_id_raw ||
      isNaN(question_size) || isNaN(syntax_size) || isNaN(group_id) ||
      question_size <= 0 || syntax_size <= 0 || group_id <= 0
    ) {
      res.status(400).json({ 
        error: 'Invalid input',
        question_size: question_size_raw,
        syntax_size: syntax_size_raw,
      });
      return;
    }

    const { adjustedQuestionArray, adjustedSyntaxArray, assignmentId } = await prisma.$transaction(async (tx) => {
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(42)`;

      const questionArray = Array.from({ length: question_size }, (_, i) => i + 1);
      const syntaxArray = Array.from({ length: question_size }, (_, i) => i + 1);

      const abandonedAssignment = await tx.assignment.findFirst({
        where: {
          group: group_id,
          abandoned: true,
        },
        orderBy: {
          latinCounter: 'asc',
        },
      });

      let newLatinCounter: number;
      let assignmentId: number;

      if (abandonedAssignment) {
        await tx.assignment.update({
          where: { id: abandonedAssignment.id },
          data: {
            abandoned: false,
            completed: false,
          },
        });

        newLatinCounter = abandonedAssignment.latinCounter;
        assignmentId = abandonedAssignment.id;
      } else {
        const maxLatinCounter = await tx.assignment.aggregate({
          where: { group: group_id },
          _max: {
            latinCounter: true,
          },
        });

        const lastLatinCounter = maxLatinCounter._max.latinCounter ?? -1;
        newLatinCounter = lastLatinCounter + 1;

        const newAssignment = await tx.assignment.create({
          data: {
            completed: false,
            abandoned: false,
            latinCounter: newLatinCounter,
            group: group_id,
          },
        });

        assignmentId = newAssignment.id;
      }

      const adjustedQuestionArray = questionArray.map(
        val => ((val + newLatinCounter - 1) % question_size) + 1
      );

      const adjustedSyntaxArray = syntaxArray.map(
        val => ((((val - newLatinCounter - 1) % syntax_size) + syntax_size) % syntax_size) + 1
      );

      return {
        adjustedQuestionArray,
        adjustedSyntaxArray,
        assignmentId,
      };
    });

    res.json({
      questionArray: adjustedQuestionArray,
      syntaxArray: adjustedSyntaxArray,
      assignmentId,
    });
  } catch (err) {
    console.error('❌ Error in getNextGroup:', err);
    next(err);
  }
};


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
