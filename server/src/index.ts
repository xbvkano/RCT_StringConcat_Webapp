import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Example route to create a survey entry
app.post('/survey', async (req, res) => {
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

    const survey = await prisma.survey.create({
      data: {
        yearsProgramming,
        age,
        sex,
        language,
        email,
        accuracy,
        time: new Date(time), // ensure valid Date
      },
    });

    res.status(201).json(survey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save survey' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
