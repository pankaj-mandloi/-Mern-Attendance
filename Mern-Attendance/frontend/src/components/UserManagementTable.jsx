import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box,
} from '@mui/material';

const UserManagementTable = ({ users, title = 'All Users' }) => {
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'error';
      case 'manager': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <Paper sx={{ 
      p: 2, 
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1f2937',
          mb: 2,
        }}
      >
        {title}
      </Typography>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {users?.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
            No users found
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Joined Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow 
                    key={user._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Chip
                        label={user.role}
                        color={getRoleColor(user.role)}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Paper>
  );
};

export default UserManagementTable;