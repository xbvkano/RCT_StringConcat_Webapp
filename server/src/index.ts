import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import { stringify } from 'csv-stringify/sync';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Health check
app.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => {
    res.send('Server is running!');
  }
);

// Create new survey entry
app.post(
  '/marcos',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        yearsProgramming,
        age,
        sex,
        language,
        email,
        accuracy,
        time,
      } = req.body;

      const survey = await prisma.marcos_Data.create({
        data: {
          yearsProgramming,
          age,
          sex,
          language,
          email,
          accuracy,
          time: new Date(time),
        },
      });

      res.status(201).json(survey);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save survey' });
    }
  }
);

// Get all survey entries as CSV
app.get(
  '/marcos',
  async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch CSV data' });
    }
  }
);

// Get a single survey entry by ID
app.get(
  '/marcos/:id',
  async (req: any, res: any) => {
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
  }
);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
