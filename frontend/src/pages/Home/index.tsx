import React from 'react';
import { Box, Typography, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);

  const features = [
    {
      title: 'AI-Powered Predictions',
      description: 'Get accurate predictions using advanced machine learning algorithms.',
      icon: '🤖',
    },
    {
      title: 'Blockchain Integration',
      description: 'Secure and transparent data management using blockchain technology.',
      icon: '🔗',
    },
    {
      title: 'Token System',
      description: 'Use INV tokens for platform governance and rewards.',
      icon: '💎',
    },
    {
      title: 'Privacy-First',
      description: 'Strong emphasis on user data protection and privacy.',
      icon: '🔒',
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          color: 'white',
          borderRadius: 2,
          mb: 6,
        }}
      >
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Inversion AI
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The Future of AI-Driven Predictions
        </Typography>
        {!isAuthenticated && (
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/dashboard')}
            sx={{ mt: 4 }}
          >
            Get Started
          </Button>
        )}
      </Box>

      <Grid container spacing={4}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} md={3} key={feature.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h1" component="div" sx={{ mb: 2 }}>
                  {feature.icon}
                </Typography>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home; 