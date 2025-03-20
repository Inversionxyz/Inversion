import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addPrediction } from '../../store/slices/predictionsSlice';

const Predictions: React.FC = () => {
  const dispatch = useDispatch();
  const { predictions } = useSelector((state: RootState) => state.predictions);
  const [open, setOpen] = useState(false);
  const [newPrediction, setNewPrediction] = useState({
    title: '',
    description: '',
    category: '',
    probability: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    dispatch(
      addPrediction({
        id: Date.now().toString(),
        title: newPrediction.title,
        description: newPrediction.description,
        probability: parseFloat(newPrediction.probability),
        date: new Date().toISOString(),
        status: 'pending',
      })
    );
    handleClose();
    setNewPrediction({
      title: '',
      description: '',
      category: '',
      probability: '',
    });
  };

  const categories = [
    'Technology',
    'Finance',
    'Healthcare',
    'Environment',
    'Social',
    'Other',
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Predictions</Typography>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          New Prediction
        </Button>
      </Box>

      <Grid container spacing={3}>
        {predictions.map((prediction) => (
          <Grid item xs={12} md={6} key={prediction.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {prediction.title}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  {prediction.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Chip
                    label={`${prediction.probability}% Probability`}
                    color={
                      prediction.probability > 70
                        ? 'success'
                        : prediction.probability > 40
                        ? 'warning'
                        : 'error'
                    }
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={prediction.status}
                    color={
                      prediction.status === 'completed'
                        ? 'success'
                        : prediction.status === 'pending'
                        ? 'warning'
                        : 'error'
                    }
                  />
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(prediction.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Prediction</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={newPrediction.title}
            onChange={(e) =>
              setNewPrediction({ ...newPrediction, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newPrediction.description}
            onChange={(e) =>
              setNewPrediction({ ...newPrediction, description: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Category</InputLabel>
            <Select
              value={newPrediction.category}
              label="Category"
              onChange={(e) =>
                setNewPrediction({ ...newPrediction, category: e.target.value })
              }
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Probability (%)"
            type="number"
            fullWidth
            value={newPrediction.probability}
            onChange={(e) =>
              setNewPrediction({ ...newPrediction, probability: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Predictions; 