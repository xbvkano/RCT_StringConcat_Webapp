// src/server/routes/marcos.ts

import { Router } from 'express';
import {
  createEntry,
  getNextGroup,
  getAllEntriesCsv,
  getEntryById,
} from '../controllers/marcosController';

const router = Router();

// Marcos routes
router.get('/', getAllEntriesCsv);
router.post('/', createEntry);
router.get('/next-group', getNextGroup);
router.get('/:id', getEntryById);

export default router;
