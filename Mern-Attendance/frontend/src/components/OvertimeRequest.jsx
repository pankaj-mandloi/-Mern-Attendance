import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Snackbar,
} from '@mui/material';
import { useRequestOvertimeMutation, useGetMyOvertimeQuery } from '../services/api';

const OvertimeRequest = ({ onRequestSuccess }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [requestOvertime, { isLoading }] = useRequestOvertimeMutation();
  const { refetch } = useGetMyOvertimeQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!hours || hours <= 0) {
      setMessage('Please enter valid hours');
      setOpenSnackbar(true);
      return;
    }
    if (!reason) {
      setMessage('Please enter a reason');
      setOpenSnackbar(true);
      return;
    }

    try {
      await requestOvertime({
        date,
        requestedHours: parseFloat(hours),
        reason,
      }).unwrap();
      
      setMessage('Overtime request submitted successfully!');
      setOpenSnackbar(true);
      setHours('');
      setReason('');
      refetch();
      if (onRequestSuccess) onRequestSuccess();
    } catch (err) {
      setMessage(err.data?.msg || 'Request failed');
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
         width: '100%', maxWidth: 320, mx: 'auto'
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
            Request Overtime
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              type="date"
              label="Date"
              fullWidth
              margin="normal"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#16a34a',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#16a34a',
                },
              }}
            />
            <TextField
              type="number"
              label="Hours"
              fullWidth
              margin="normal"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              required
              inputProps={{ step: 0.5, min: 0.5 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#16a34a',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#16a34a',
                },
              }}
            />
            <TextField
              label="Reason"
              fullWidth
              margin="normal"
              multiline
              rows={2}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&:hover fieldset': {
                    borderColor: '#d1d5db',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#16a34a',
                    borderWidth: '2px',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#16a34a',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 2,
                bgcolor: '#16a34a',
                textTransform: 'none',
                borderRadius: '8px',
                px: 3,
                '&:hover': {
                  bgcolor: '#15803d',
                },
                '&.Mui-disabled': {
                  bgcolor: '#86efac',
                },
              }}
            >
              {isLoading ? 'Submitting...' : 'Submit request'}
            </Button>
          </Box>
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

export default OvertimeRequest;