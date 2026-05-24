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
  IconButton,
  Tooltip,
  Box,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const TeamAttendanceTable = ({ records, title = 'Team Attendance', onViewSelfie }) => {
  const formatTime = (date) => {
    if (!date) return 'Not punched';
    return new Date(date).toLocaleTimeString();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
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
        {records?.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
            No attendance records found
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: '100%' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Employee</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch in</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch out</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Hours</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Validation</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Selfie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records?.map((record) => (
                  <TableRow 
                    key={record._id}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#f9fafb',
                      },
                    }}
                  >
                    <TableCell>{record.userId?.name || 'Unknown'}</TableCell>
                    <TableCell>{formatDate(record.date)}</TableCell>
                    <TableCell>{formatTime(record.punchInTime)}</TableCell>
                    <TableCell>{formatTime(record.punchOutTime)}</TableCell>
                    <TableCell>
                      {record.totalHours ? `${record.totalHours} hrs` : '-'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.totalHours >= 8 ? 'Completed' : 'Incomplete'}
                        color={record.totalHours >= 8 ? 'success' : 'warning'}
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={record.status || 'pending'}
                        color={
                          record.status === 'valid' ? 'success' :
                          record.status === 'invalid' ? 'error' : 'default'
                        }
                        size="small"
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Selfie">
                        <IconButton 
                          onClick={() => onViewSelfie(record)} 
                          size="small"
                          sx={{
                            color: '#16a34a',
                            '&:hover': {
                              backgroundColor: '#f0fdf4',
                            },
                          }}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
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

export default TeamAttendanceTable; 