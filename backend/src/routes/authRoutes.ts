import express from 'express';
import { register, login, updateWallet } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.patch('/wallet', protect, updateWallet);

export default router; 