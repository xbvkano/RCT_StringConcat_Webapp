import { Router } from 'express';
import {
  createKushaEntry,
  getAllKushaEntriesCsv,
  getKushaEntryById,
} from '../controllers/kushaController';

const router = Router();

// Marcos routes
router.get('/', getAllKushaEntriesCsv);
router.post('/', createKushaEntry);
router.get('/:id', getKushaEntryById);

export default router;
