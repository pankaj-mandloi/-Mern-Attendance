import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Alert,
  Snackbar,
} from '@mui/material';
import { Login, Logout, AccessTime } from '@mui/icons-material';
import { usePunchInMutation, usePunchOutMutation } from '../services/api';
import SelfieCapture from './SelfieCapture';
import LocationCapture from './LocationCapture';

const PunchCard = ({ onPunchSuccess }) => {
  const [punchIn, { isLoading: punchInLoading }] = usePunchInMutation();
  const [punchOut, { isLoading: punchOutLoading }] = usePunchOutMutation();
  const [selfie, setSelfie] = useState(null);
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handlePunchIn = async () => {
    if (!selfie) {
      setMessage('Please capture selfie first');
      setOpenSnackbar(true);
      return;
    }
    if (!location) {
      setMessage('Please capture location first');
      setOpenSnackbar(true);
      return;
    }

    try {
      await punchIn({ selfie, location }).unwrap();
      setMessage('Punch in successful!');
      setOpenSnackbar(true);
      setSelfie(null);
      setLocation(null);
      if (onPunchSuccess) onPunchSuccess();
    } catch (err) {
      setMessage(err.data?.msg || 'Punch in failed');
      setOpenSnackbar(true);
    }
  };

  const handlePunchOut = async () => {
    if (!selfie) {
      setMessage('Please capture selfie first');
      setOpenSnackbar(true);
      return;
    }
    if (!location) {
      setMessage('Please capture location first');
      setOpenSnackbar(true);
      return;
    }

    try {
      await punchOut({ selfie, location }).unwrap();
      setMessage('Punch out successful!');
      setOpenSnackbar(true);
      setSelfie(null);
      setLocation(null);
      if (onPunchSuccess) onPunchSuccess();
    } catch (err) {
      setMessage(err.data?.msg || 'Punch out failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <>
      <Card 
        sx={{ 
          mb: 3,
          borderRadius: '12px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardContent>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AccessTime sx={{ mr: 1, color: '#16a34a' }} />
            Attendance
          </Typography>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={4}>
              <SelfieCapture onCapture={setSelfie} buttonText="Take selfie" />
              {selfie && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#14b8a6', 
                    display: 'block', 
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  ✓ Selfie captured
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <LocationCapture onLocationCapture={setLocation} buttonText="Get location" />
              {location && (
                <Typography 
                  variant="caption" 
                  sx={{ 
                    color: '#8b5cf6', 
                    display: 'block', 
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  ✓ Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<Login />}
                  onClick={handlePunchIn}
                  disabled={punchInLoading}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#16a34a',
                    color: '#16a34a',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#16a34a',
                      color: 'white',
                      borderColor: '#16a34a',
                    },
                    '&.Mui-disabled': {
                      borderColor: '#86efac',
                      color: '#86efac',
                    },
                  }}
                >
                  {punchInLoading ? 'Processing...' : 'Punch in'}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Logout />}
                  onClick={handlePunchOut}
                  disabled={punchOutLoading}
                  sx={{
                    textTransform: 'none',
                    borderColor: '#dc2626',
                    color: '#dc2626',
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#dc2626',
                      color: 'white',
                      borderColor: '#dc2626',
                    },
                    '&.Mui-disabled': {
                      borderColor: '#fca5a5',
                      color: '#fca5a5',
                    },
                  }}
                >
                  {punchOutLoading ? 'Processing...' : 'Punch out'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={message.includes('successful') ? 'success' : 'error'}
          sx={{
            borderRadius: '8px',
            '& .MuiAlert-icon': {
              alignItems: 'center',
            },
          }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PunchCard;