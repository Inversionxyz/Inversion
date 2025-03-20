import express from 'express';
import {
  createPrediction,
  getPredictions,
  getPredictionById,
  updatePredictionStatus,
  getPredictionStats,
} from '../controllers/predictionController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.post('/', createPrediction);
router.get('/', getPredictions);
router.get('/stats', getPredictionStats);
router.get('/:id', getPredictionById);
router.patch('/:id/status', updatePredictionStatus);

export default router; 