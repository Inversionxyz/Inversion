import { Request, Response, NextFunction } from 'express';
import { BlockchainService } from '../services/blockchainService';
import { AppError } from '../utils/AppError';

const blockchainService = new BlockchainService();

export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address } = req.params;
    const balance = await blockchainService.getBalance(address);

    res.status(200).json({
      status: 'success',
      data: { balance },
    });
  } catch (error) {
    next(error);
  }
};

export const transferTokens = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fromAddress, toAddress, amount } = req.body;
    const success = await blockchainService.transferTokens(fromAddress, toAddress, amount);

    res.status(200).json({
      status: 'success',
      data: { success },
    });
  } catch (error) {
    next(error);
  }
};

export const updateWallet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { walletAddress } = req.body;
    const userId = req.user.id;

    await blockchainService.updateUserWallet(userId, walletAddress);

    res.status(200).json({
      status: 'success',
      message: 'Wallet updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

export const verifyTransaction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { txHash } = req.params;
    const success = await blockchainService.verifyTransaction(txHash);

    res.status(200).json({
      status: 'success',
      data: { success },
    });
  } catch (error) {
    next(error);
  }
}; 