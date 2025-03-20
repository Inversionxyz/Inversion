import { Prediction } from '../models/Prediction';
import { User } from '../models/User';
import { AppError } from '../utils/AppError';

export class PredictionService {
  async createPrediction(userId: string, data: {
    title: string;
    description: string;
    category: string;
    probability: number;
    targetDate: Date;
  }) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Check if user has enough balance
    if (user.balance < 100) {
      throw new AppError('Insufficient balance', 400);
    }

    // Create prediction
    const prediction = await Prediction.create({
      ...data,
      userId,
      status: 'pending',
      createdAt: new Date(),
    });

    // Update user balance and add prediction to user's predictions
    user.balance -= 100;
    user.predictions.push(prediction._id);
    await user.save();

    return prediction;
  }

  async getPredictions(userId: string, filters: {
    status?: string;
    category?: string;
    startDate?: Date;
    endDate?: Date;
  } = {}) {
    const query: any = { userId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.startDate || filters.endDate) {
      query.targetDate = {};
      if (filters.startDate) {
        query.targetDate.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.targetDate.$lte = filters.endDate;
      }
    }

    return await Prediction.find(query).sort({ createdAt: -1 });
  }

  async getPredictionById(predictionId: string) {
    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      throw new AppError('Prediction not found', 404);
    }
    return prediction;
  }

  async updatePredictionStatus(predictionId: string, status: string) {
    const prediction = await Prediction.findByIdAndUpdate(
      predictionId,
      { status },
      { new: true }
    );

    if (!prediction) {
      throw new AppError('Prediction not found', 404);
    }

    return prediction;
  }

  async getPredictionStats(userId: string) {
    const predictions = await Prediction.find({ userId });
    
    const total = predictions.length;
    const completed = predictions.filter(p => p.status === 'completed').length;
    const successRate = total > 0 ? (completed / total) * 100 : 0;

    return {
      total,
      completed,
      successRate,
      byCategory: predictions.reduce((acc, p) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
  }
} 