import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
} from '@mui/material';
import { Dashboard, Logout } from '@mui/icons-material';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleClose();
  };

  const getDashboardTitle = () => {
    switch (user?.role) {
      case 'admin': return 'Admin Dashboard';
      case 'manager': return 'Manager Dashboard';
      default: return 'Employee Dashboard';
    }
  };

  const getInitials = () => {
    if (!user?.name) return 'U';
    return user.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{
        bgcolor: '#16a34a',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Dashboard sx={{ color: '#16a34a', fontSize: '1.3rem' }} />
          </Box>
          <Box>
            <Typography 
              sx={{ 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                color: '#ffffff',
                lineHeight: 1.2,
              }}
            >
              Attendance System
            </Typography>
            <Typography 
              sx={{ 
                fontSize: '0.7rem',
                color: '#dcfce7',
                fontWeight: 500,
              }}
            >
              {getDashboardTitle()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.5,
              borderRadius: '20px',
              bgcolor: '#ffffff20',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: '#ffffff',
              }}
            />
            <Typography sx={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: 500 }}>
              {user?.role}
            </Typography>
          </Box>

          <Typography 
            sx={{ 
              display: { xs: 'none', md: 'block' },
              fontSize: '0.875rem',
              color: '#ffffff',
              fontWeight: 500,
            }}
          >
            {user?.name}
          </Typography>

          <IconButton 
            onClick={handleMenu} 
            disableRipple
            sx={{ p: 0 }}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                bgcolor: '#ffffff',
                color: '#16a34a',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
              }}
            >
              {getInitials()}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 220,
                borderRadius: '12px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
              },
            }}
          >
            <Box sx={{ px: 2, py: 1.5, bgcolor: '#f9fafb' }}>
              <Typography sx={{ fontWeight: 600, color: '#1f2937', fontSize: '0.875rem' }}>
                {user?.name}
              </Typography>
              <Typography sx={{ color: '#6b7280', fontSize: '0.75rem', mt: 0.5 }}>
                {user?.email}
              </Typography>
            </Box>
            
            <Divider />
            
            <MenuItem 
              onClick={handleLogout}
              sx={{
                py: 1.2,
                mx: 1,
                my: 0.5,
                borderRadius: '8px',
                gap: 1.5,
                color: '#dc2626',
                '&:hover': {
                  bgcolor: '#fef2f2',
                },
              }}
            >
              <Logout sx={{ fontSize: '1.1rem' }} />
              <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>Sign out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;