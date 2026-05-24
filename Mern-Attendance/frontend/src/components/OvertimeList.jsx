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

const OvertimeList = ({ requests, title = 'My Overtime Requests' }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Paper sx={{ 
      p: 2, 
      borderRadius: '12px',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
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
      
      {requests?.length === 0 ? (
        <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
          No overtime requests found
        </Typography>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Hours</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Reason</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Remarks</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests?.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{formatDate(request.date)}</TableCell>
                  <TableCell>{request.requestedHours} hrs</TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    <Chip
                      label={request.status}
                      color={
                        request.status === 'approved' ? 'success' :
                        request.status === 'rejected' ? 'error' : 'warning'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{request.remarks || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default OvertimeList;