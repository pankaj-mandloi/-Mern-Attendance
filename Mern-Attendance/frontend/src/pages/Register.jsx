import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  MenuItem,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRegisterMutation } from '../services/api';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const validateName = (value) => {
    if (!value || value.trim() === '') {
      setNameError('Full Name is required');
      return false;
    }
    if (value.trim().length < 3) {
      setNameError('Name must be at least 3 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value || value.trim() === '') {
      setEmailError('Email Address is required');
      return false;
    }
    if (!emailPattern.test(value)) {
      setEmailError('Enter a valid email (e.g., name@example.com)');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError('Password is required');
      return false;
    }
    if (value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isNameValid || !isEmailValid || !isPasswordValid) {
      return;
    }
    
    setError('');
    setSuccessMessage('');
    
    try {
      await register({ name, email, password, role }).unwrap();
      
      setSuccessMessage('Registration successful! Redirecting to login...');
      setOpenSnackbar(true);
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      setError(err.data?.msg || 'Registration failed');
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '400px',
          borderRadius: '16px',
          bgcolor: 'white',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          sx={{
            fontWeight: 'bold',
            mb: 1,
            color: '#1f2937',
            fontSize: '1.875rem',
          }}
        >
          Sign Up
        </Typography>

        <Typography
          textAlign="center"
          sx={{
            mb: 3,
            color: '#6b7280',
            fontSize: '0.875rem',
          }}
        >
          After registration, please login with your credentials
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Full Name"
            autoFocus
            value={name}
            onChange={handleNameChange}
            error={!!nameError}
            helperText={nameError}
            disabled={isLoading}
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
                  borderColor: '#22c55e',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22c55e',
              },
            }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
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
                  borderColor: '#22c55e',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22c55e',
              },
            }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={() => setShowPassword(!showPassword)} 
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
                  borderColor: '#22c55e',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22c55e',
              },
            }}
          />
          
          <TextField
            fullWidth
            margin="normal"
            select
            label="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled={isLoading}
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
                  borderColor: '#22c55e',
                  borderWidth: '2px',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#6b7280',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#22c55e',
              },
            }}
          >
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
          
          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: '#16a34a',
              color: 'white',
              py: 1.5,
              borderRadius: '8px',
              fontWeight: 'medium',
              fontSize: '1rem',
              textTransform: 'none',
              position: 'relative',
              '&:hover': {
                bgcolor: '#15803d',
              },
              '&.Mui-disabled': {
                bgcolor: '#86efac',
                color: 'white',
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} sx={{ color: 'white' }} />
                <span>Creating account...</span>
              </Box>
            ) : (
              'Sign Up'
            )}
          </Button>
          
          <Box textAlign="center">
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#16a34a',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Login
              </Typography>
            </Link>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity={error ? 'error' : 'success'} 
          onClose={() => setOpenSnackbar(false)}
          sx={{ borderRadius: '8px' }}
        >
          {error || successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Register;