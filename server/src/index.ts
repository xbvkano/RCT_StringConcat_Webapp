import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient, Sex } from '@prisma/client';
import cors from 'cors';
import { stringify } from 'csv-stringify/sync';
import { Value } from '@prisma/client/runtime/library';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running!');
});

// Create new survey entry
app.post('/marcos', async (req: any, res: any) => {
  try {
    console.log("Got request with body:", req.body); // ✅ properly log

    const {
      yearsProgramming,
      age,
      sex,
      language,
      email,
      accuracy,
      time,
      task_accuracy
    } = req.body;

    const parsedYears = parseInt(yearsProgramming, 10);
    const parsedAge = parseInt(age, 10);

    const sexEnum: Sex = sex;
    console.log("GOt sex:" + sex + " Translated to :" + sexEnum)
    if (!sexEnum) {
      return res.status(400).json({ error: `Invalid sex value: ${sex}` });
    }

    const survey = await prisma.marcos_Data.create({
      data: {
        yearsProgramming: parsedYears,
        age: parsedAge,
        sex: sexEnum,
        language,
        email,
        accuracy,
        task_accuracy,
        time,
      },
    });

    res.status(201).json(survey);
  } catch (error) {
    console.error('❌ Error saving survey:', error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

// Get all survey entries as CSV
app.get('/marcos', async (_req: Request, res: Response) => {
  try {
    const data = await prisma.marcos_Data.findMany();
    const csv = stringify(data, { header: true });

    res
      .status(200)
      .header('Content-Type', 'text/csv')
      .header('Content-Disposition', 'attachment; filename=\"marcos_data.csv\"')
      .send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch CSV data' });
  }
});

// Get single entry by ID
app.get('/marcos/:id', async (req: any, res: any) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const entry = await prisma.marcos_Data.findUnique({
      where: { id },
    });

    if (!entry) {
      return res.status(404).json({ error: 'Survey not found' });
    }

    res.status(200).json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch entry' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
