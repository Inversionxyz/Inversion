import { Request, Response, NextFunction } from 'express';
import { PredictionService } from '../services/predictionService';
import { AppError } from '../utils/AppError';

const predictionService = new PredictionService();

export const createPrediction = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const predictionData = req.body;

    const prediction = await predictionService.createPrediction(userId, predictionData);

    res.status(201).json({
      status: 'success',
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
};

export const getPredictions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const filters = req.query;

    const predictions = await predictionService.getPredictions(userId, filters);

    res.status(200).json({
      status: 'success',
      data: predictions,
    });
  } catch (error) {
    next(error);
  }
};

export const getPredictionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const prediction = await predictionService.getPredictionById(id);

    res.status(200).json({
      status: 'success',
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
};

export const updatePredictionStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const prediction = await predictionService.updatePredictionStatus(id, status);

    res.status(200).json({
      status: 'success',
      data: prediction,
    });
  } catch (error) {
    next(error);
  }
};

export const getPredictionStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user.id;
    const stats = await predictionService.getPredictionStats(userId);

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (error) {
    next(error);
  }
}; 