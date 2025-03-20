import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  walletAddress: string | null;
  balance: number;
  predictions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 1000,
    },
    predictions: [{
      type: Schema.Types.ObjectId,
      ref: 'Prediction',
    }],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>('User', userSchema); 