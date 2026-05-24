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
} from '@mui/material';

const AttendanceTable = ({ records, title = 'Attendance History' }) => {
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
      transition: 'box-shadow 0.2s ease',
      '&:hover': {
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    }}>
      <Typography 
        variant="h6" 
        gutterBottom
        sx={{
          fontWeight: 'bold',
          color: '#1f2937',
        }}
      >
        {title}
      </Typography>
      
      {records?.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
          No attendance records found
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch in</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch out</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Hours</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Validation</TableCell>
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
                  <TableCell>{formatDate(record.date)}</TableCell>
                  <TableCell>{formatTime(record.punchInTime)}</TableCell>
                  <TableCell>{formatTime(record.punchOutTime)}</TableCell>
                  <TableCell>
                    {record.totalHours ? `${record.totalHours} hrs` : '-'}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={record.workStatus || (record.totalHours >= 8 ? 'Completed' : 'Incomplete')}
                      color={record.totalHours >= 8 ? 'success' : 'warning'}
                      size="small"
                      sx={{
                        fontWeight: 500,
                      }}
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
                      sx={{
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default AttendanceTable;