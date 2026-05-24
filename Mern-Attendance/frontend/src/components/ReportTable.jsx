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
  IconButton,
  Tooltip,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

const ReportTable = ({ records, title = 'Daily Report', date, onViewSelfie }) => {
  const formatTime = (date) => {
    if (!date) return 'Not punched';
    return new Date(date).toLocaleTimeString();
  };

  return (
    <Paper sx={{ 
      p: 2, 
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    //   height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{
            fontWeight: 'bold',
            color: '#1f2937',
          }}
        >
          {title} - {date}
        </Typography>
      </Box>
      
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {records?.length === 0 ? (
          <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
            No records found for this date
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch in</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Punch out</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Selfie</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Working Hours</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
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
                    <TableCell>{formatTime(record.punchInTime)}</TableCell>
                    <TableCell>{formatTime(record.punchOutTime)}</TableCell>
                    <TableCell>
                      <Tooltip title="View Selfie">
                        <IconButton 
                          size="small" 
                          onClick={() => onViewSelfie(record)}
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
                    <TableCell>
                      {record.punchInLocation?.lat?.toFixed(4) || '-'}, 
                      {record.punchInLocation?.lng?.toFixed(4) || '-'}
                    </TableCell>
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

export default ReportTable;