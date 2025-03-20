import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  setConnection,
  setAccount,
  setBalance,
  setNetworkId,
} from '../../store/slices/blockchainSlice';
import Web3 from 'web3';

const WalletConnect: React.FC = () => {
  const dispatch = useDispatch();
  const { isConnected, account, balance, networkId } = useSelector(
    (state: RootState) => state.blockchain
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [web3, setWeb3] = useState<Web3 | null>(null);

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
    }
  }, []);

  const connectWallet = async () => {
    if (!web3) {
      setError('Please install MetaMask or another Web3 wallet');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Get network ID
      const networkId = await web3.eth.net.getId();

      // Get balance
      const balance = await web3.eth.getBalance(accounts[0]);

      dispatch(setAccount(accounts[0]));
      dispatch(setNetworkId(networkId));
      dispatch(setBalance(web3.utils.fromWei(balance, 'ether')));
      dispatch(setConnection(true));

      setOpen(false);
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    dispatch(setAccount(null));
    dispatch(setNetworkId(null));
    dispatch(setBalance('0'));
    dispatch(setConnection(false));
  };

  return (
    <>
      {!isConnected ? (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Connect Wallet
        </Button>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2">
            {account?.slice(0, 6)}...{account?.slice(-4)}
          </Typography>
          <Typography variant="body2">
            {parseFloat(balance).toFixed(4)} ETH
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            onClick={disconnectWallet}
          >
            Disconnect
          </Button>
        </Box>
      )}

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Connect Wallet</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Typography variant="body1" gutterBottom>
            Connect your wallet to access all features of Inversion AI
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={connectWallet}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Connect'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WalletConnect; 