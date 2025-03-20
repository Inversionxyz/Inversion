import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IPrediction extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  category: string;
  probability: number;
  status: 'pending' | 'completed' | 'failed';
  targetDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const predictionSchema = new Schema<IPrediction>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Technology', 'Finance', 'Health', 'Environment', 'Society', 'Other'],
    },
    probability: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    targetDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Prediction = mongoose.model<IPrediction>('Prediction', predictionSchema); 