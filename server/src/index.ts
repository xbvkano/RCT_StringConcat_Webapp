import express, { NextFunction } from 'express';
import { PrismaClient, Sex, ProgrammingLanguage } from '@prisma/client';
import cors from 'cors';
import { stringify } from 'csv-stringify/sync';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req: any, res: any) => {
  res.send('Server is running!');
});

// Create new survey entry
app.post(
  '/marcos',
  async (req: any, res: any, next: NextFunction) => {
    try {
      const {
        yearsProgramming,
        age,
        sex: rawSex,
        language: rawLanguage,
        email,
        accuracy,
        task_accuracy,
        time: rawTime,
      } = req.body;
      
      console.log("POST request to /marcos with body:" + JSON.stringify(req.body))

      // --- parse ints ---
      const parsedYears = parseInt(yearsProgramming, 10);
      const parsedAge = parseInt(age, 10);

      // --- map sex ---
      let sexEnum: Sex;
      switch ((rawSex as string).toLowerCase()) {
        case 'male':
          sexEnum = Sex.male;
          break;
        case 'female':
          sexEnum = Sex.female;
          break;
        case 'other':
          sexEnum = Sex.other;
          break;
        default:
          return res.status(400).json({ error: `Invalid sex: ${rawSex}` });
      }

      // --- map programming language ---
      let languageEnum: ProgrammingLanguage;
      switch ((rawLanguage as string).toLowerCase()) {
        case 'cpp':
        case 'c++':
          languageEnum = ProgrammingLanguage.cpp;
          break;
        case 'java':
          languageEnum = ProgrammingLanguage.java;
          break;
        case 'csharp':
        case 'c#':
          languageEnum = ProgrammingLanguage.csharp;
          break;
        case 'js':
        case 'javascript':
          languageEnum = ProgrammingLanguage.js;
          break;
        case 'ts':
        case 'typescript':
          languageEnum = ProgrammingLanguage.ts;
          break;
        case 'python':
          languageEnum = ProgrammingLanguage.python;
          break;
        default:
          languageEnum = ProgrammingLanguage.other;
      }

      // --- parse date ---
      const parsedTime = new Date(rawTime);
      if (isNaN(parsedTime.valueOf())) {
        return res
          .status(400)
          .json({ error: `Invalid time: ${rawTime}` });
      }

      const survey = await prisma.marcos_Data.create({
        data: {
          yearsProgramming: parsedYears,
          age: parsedAge,
          sex: sexEnum,
          language: languageEnum,
          email,
          accuracy: typeof accuracy === 'string'
            ? parseFloat(accuracy)
            : accuracy,
          task_accuracy,
          time: parsedTime,
        },
      });

      return res.status(201).json(survey);
    } catch (err) {
      console.error('❌ Error saving survey:', err);
      return next(err);
    }
  }
);

// Get all survey entries as CSV
app.get(
  '/marcos',
  async (_req: any, res: any, next: NextFunction) => {
    try {
      const data = await prisma.marcos_Data.findMany();
      const csv = stringify(data, { header: true });
      res
        .status(200)
        .header('Content-Type', 'text/csv')
        .header(
          'Content-Disposition',
          'attachment; filename="marcos_data.csv"'
        )
        .send(csv);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// Get single entry by ID
app.get(
  '/marcos/:id',
  async (req: any, res: any, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      const entry = await prisma.marcos_Data.findUnique({ where: { id } });
      if (!entry) {
        return res.status(404).json({ error: 'Not found' });
      }
      res.status(200).json(entry);
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
);

// Global error handler
app.use(
  (err: any, _req: any, res: any, _next: NextFunction) => {
    res.status(500).json({ error: 'Internal server error' });
  }
);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
