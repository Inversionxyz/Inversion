import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Timeline,
  TrendingUp,
  AccountBalance,
  Notifications,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { predictions } = useSelector((state: RootState) => state.predictions);
  const { balance } = useSelector((state: RootState) => state.blockchain);

  const stats = [
    {
      title: 'Total Predictions',
      value: predictions.length,
      icon: <Timeline />,
      color: '#1976d2',
    },
    {
      title: 'Success Rate',
      value: '85%',
      icon: <TrendingUp />,
      color: '#2e7d32',
    },
    {
      title: 'Token Balance',
      value: `${balance} INV`,
      icon: <AccountBalance />,
      color: '#ed6c02',
    },
    {
      title: 'Notifications',
      value: '3',
      icon: <Notifications />,
      color: '#9c27b0',
    },
  ];

  const recentPredictions = predictions.slice(0, 5);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome back, {user?.username || 'User'}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: `${stat.color}20`,
                      borderRadius: '50%',
                      p: 1,
                      mr: 2,
                    }}
                  >
                    {React.cloneElement(stat.icon, { sx: { color: stat.color } })}
                  </Box>
                  <Typography variant="h6" component="div">
                    {stat.title}
                  </Typography>
                </Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {stat.value}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={75}
                  sx={{ mt: 2, backgroundColor: `${stat.color}20` }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Predictions
              </Typography>
              <List>
                {recentPredictions.map((prediction) => (
                  <ListItem key={prediction.id}>
                    <ListItemIcon>
                      <Timeline color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={prediction.title}
                      secondary={`Probability: ${prediction.probability}%`}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
              >
                View All Predictions
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem button>
                  <ListItemIcon>
                    <Timeline color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="New Prediction" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <AccountBalance color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Stake Tokens" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <TrendingUp color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="View Analytics" />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 