import express from 'express';
import {
  getBalance,
  transferTokens,
  updateWallet,
  verifyTransaction,
} from '../controllers/blockchainController';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(protect);

router.get('/balance/:address', getBalance);
router.post('/transfer', transferTokens);
router.patch('/wallet', updateWallet);
router.get('/verify/:txHash', verifyTransaction);

export default router; 