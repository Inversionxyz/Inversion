import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlockchainState {
  isConnected: boolean;
  networkId: number | null;
  account: string | null;
  balance: string;
  transactions: any[];
  loading: boolean;
  error: string | null;
}

const initialState: BlockchainState = {
  isConnected: false,
  networkId: null,
  account: null,
  balance: '0',
  transactions: [],
  loading: false,
  error: null,
};

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    setConnection: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setNetworkId: (state, action: PayloadAction<number>) => {
      state.networkId = action.payload;
    },
    setAccount: (state, action: PayloadAction<string | null>) => {
      state.account = action.payload;
    },
    setBalance: (state, action: PayloadAction<string>) => {
      state.balance = action.payload;
    },
    addTransaction: (state, action: PayloadAction<any>) => {
      state.transactions.push(action.payload);
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
  setConnection,
  setNetworkId,
  setAccount,
  setBalance,
  addTransaction,
  setLoading,
  setError,
} = blockchainSlice.actions;

export default blockchainSlice.reducer; 