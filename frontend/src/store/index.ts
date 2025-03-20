import { configureStore } from '@reduxjs/toolkit';
import predictionsReducer from './slices/predictionsSlice';
import userReducer from './slices/userSlice';
import blockchainReducer from './slices/blockchainSlice';

export const store = configureStore({
  reducer: {
    predictions: predictionsReducer,
    user: userReducer,
    blockchain: blockchainReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 