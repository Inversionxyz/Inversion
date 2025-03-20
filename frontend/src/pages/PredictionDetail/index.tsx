import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Divider,
  LinearProgress,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  CalendarToday,
  Category,
  Description,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PredictionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { predictions } = useSelector((state: RootState) => state.predictions);
  const prediction = predictions.find((p) => p.id === id);

  if (!prediction) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" gutterBottom>
          Prediction not found
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/predictions')}
        >
          Back to Predictions
        </Button>
      </Box>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Prediction Details</Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate('/predictions')}
        >
          Back to Predictions
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {prediction.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Chip
                  label={`${prediction.probability}% Probability`}
                  color={
                    prediction.probability > 70
                      ? 'success'
                      : prediction.probability > 40
                      ? 'warning'
                      : 'error'
                  }
                />
                <Chip
                  label={prediction.status}
                  color={getStatusColor(prediction.status)}
                />
              </Box>
              <Typography variant="body1" paragraph>
                {prediction.description}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Probability Distribution
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={prediction.probability}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        prediction.probability > 70
                          ? 'success.main'
                          : prediction.probability > 40
                          ? 'warning.main'
                          : 'error.main',
                    },
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Prediction Information
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Created: {new Date(prediction.date).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Category sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">Category: Technology</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Timeline sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">Status: {prediction.status}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2">
                    Success Rate: 85%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Related Predictions
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No related predictions found.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PredictionDetail; 