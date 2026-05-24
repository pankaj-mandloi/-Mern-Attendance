import React, { useState } from 'react';
import { Button, Box, Alert, CircularProgress } from '@mui/material';
import { MyLocation } from '@mui/icons-material';

const LocationCapture = ({ onLocationCapture, buttonText = 'Get location' }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getLocation = () => {
    setLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        onLocationCapture(location);
        setLoading(false);
      },
      (err) => {
        setError('Unable to get location. Please enable location access.');
        setLoading(false);
      }
    );
  };

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={loading ? <CircularProgress size={20} /> : <MyLocation />}
        onClick={getLocation}
        disabled={loading}
        sx={{
          textTransform: 'none',
          borderColor: '#8b5cf6',
          color: '#8b5cf6',
          backgroundColor: 'transparent',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#8b5cf6',
            color: 'white',
            borderColor: '#8b5cf6',
          },
          '&.Mui-disabled': {
            borderColor: '#d1d5db',
            color: '#9ca3af',
          },
        }}
      >
        {buttonText}
      </Button>
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 1, 
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              alignItems: 'center',
            },
          }}
        >
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default LocationCapture;