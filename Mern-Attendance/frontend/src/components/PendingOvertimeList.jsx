import React, { useState } from 'react';
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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
} from '@mui/material';
import { Check, Close } from '@mui/icons-material';

const PendingOvertimeList = ({ requests, onApprove, onReject }) => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [remarks, setRemarks] = useState('');
  const [actionType, setActionType] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAction = (request, type) => {
    setSelectedRequest(request);
    setActionType(type);
    setRemarks('');
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    if (actionType === 'approve') {
      onApprove(selectedRequest._id, remarks);
    } else {
      onReject(selectedRequest._id, remarks);
    }
    setOpenDialog(false);
    setSelectedRequest(null);
    setRemarks('');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <>
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
          Pending Overtime Requests
        </Typography>
        
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {requests?.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
              No pending overtime requests
            </Typography>
          ) : (
            <TableContainer sx={{ maxHeight: '100%' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#f9fafb' }}>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Employee</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Hours</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Reason</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests?.map((request) => (
                    <TableRow 
                      key={request._id}
                      sx={{
                        '&:hover': {
                          backgroundColor: '#f9fafb',
                        },
                      }}
                    >
                      <TableCell>{request.userId?.name || 'Unknown'}</TableCell>
                      <TableCell>{formatDate(request.date)}</TableCell>
                      <TableCell>{request.requestedHours} hrs</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Chip 
                          label={request.status} 
                          color="warning" 
                          size="small"
                          sx={{ fontWeight: 500 }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          sx={{
                            color: '#16a34a',
                            border: '1px solid #16a34a',
                            borderRadius: '8px',
                            mr: 1,
                            '&:hover': {
                              backgroundColor: '#16a34a',
                              color: 'white',
                            },
                          }}
                          onClick={() => handleAction(request, 'approve')}
                          size="small"
                        >
                          <Check />
                        </IconButton>
                        <IconButton
                          sx={{
                            color: '#dc2626',
                            border: '1px solid #dc2626',
                            borderRadius: '8px',
                            '&:hover': {
                              backgroundColor: '#dc2626',
                              color: 'white',
                            },
                          }}
                          onClick={() => handleAction(request, 'reject')}
                          size="small"
                        >
                          <Close />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
          }
        }}
      >
        <DialogTitle sx={{ 
          fontWeight: 'bold', 
          color: '#1f2937',
          borderBottom: '1px solid #e5e7eb',
          pb: 2,
        }}>
          {actionType === 'approve' ? 'Approve Overtime' : 'Reject Overtime'}
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            label="Remarks (Optional)"
            fullWidth
            multiline
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            sx={{ 
              mt: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              },
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2, borderTop: '1px solid #e5e7eb', gap: 1 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            sx={{
              textTransform: 'none',
              color: '#6b7280',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#f3f4f6',
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            sx={{
              textTransform: 'none',
              borderRadius: '8px',
              px: 3,
              bgcolor: actionType === 'approve' ? '#16a34a' : '#dc2626',
              '&:hover': {
                bgcolor: actionType === 'approve' ? '#15803d' : '#b91c1c',
              },
            }}
          >
            {actionType === 'approve' ? 'Approve' : 'Reject'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PendingOvertimeList;