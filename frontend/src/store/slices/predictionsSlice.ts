import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Prediction {
  id: string;
  title: string;
  description: string;
  probability: number;
  date: string;
  status: 'pending' | 'completed' | 'failed';
}

interface PredictionsState {
  predictions: Prediction[];
  loading: boolean;
  error: string | null;
}

const initialState: PredictionsState = {
  predictions: [],
  loading: false,
  error: null,
};

const predictionsSlice = createSlice({
  name: 'predictions',
  initialState,
  reducers: {
    setPredictions: (state, action: PayloadAction<Prediction[]>) => {
      state.predictions = action.payload;
    },
    addPrediction: (state, action: PayloadAction<Prediction>) => {
      state.predictions.push(action.payload);
    },
    updatePrediction: (state, action: PayloadAction<Prediction>) => {
      const index = state.predictions.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.predictions[index] = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPredictions,
  addPrediction,
  updatePrediction,
  setLoading,
  setError,
} = predictionsSlice.actions;

export default predictionsSlice.reducer; 