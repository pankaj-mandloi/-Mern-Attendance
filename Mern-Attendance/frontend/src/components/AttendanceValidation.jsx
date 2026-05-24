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
  Tooltip,
  MenuItem,
} from '@mui/material';
import { Visibility, CheckCircle, Cancel } from '@mui/icons-material';

const AttendanceValidation = ({ records, onValidate, onViewSelfie }) => {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [status, setStatus] = useState('valid');
  const [remarks, setRemarks] = useState('');

  const handleValidateClick = (record) => {
    setSelectedRecord(record);
    setStatus(record.status === 'valid' ? 'valid' : 'invalid');
    setRemarks(record.remarks || '');
    setOpenDialog(true);
  };

  const handleConfirm = () => {
    onValidate(selectedRecord._id, status, remarks);
    setOpenDialog(false);
  };

  const formatTime = (date) => {
    if (!date) return 'Not punched';
    return new Date(date).toLocaleTimeString();
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
          Attendance Validation
        </Typography>
        
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {records?.length === 0 ? (
            <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
              No attendance records found
            </Typography>
          ) : (
            <TableContainer sx={{ maxHeight: 500 }}>
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
                    <TableCell sx={{ fontWeight: 'bold', color: '#374151' }}>Actions</TableCell>
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
                      <TableCell>
                        <Tooltip title="Validate Attendance">
                          <IconButton
                            onClick={() => handleValidateClick(record)}
                            size="small"
                            sx={{
                              color: '#3b82f6',
                              '&:hover': {
                                backgroundColor: '#eff6ff',
                              },
                            }}
                          >
                            <CheckCircle />
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

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)} 
        maxWidth="sm" 
        fullWidth
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
          Validate Attendance - {selectedRecord?.userId?.name}
        </DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              label="Validation Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              margin="normal"
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
            >
              <MenuItem value="valid">Valid ✅</MenuItem>
              <MenuItem value="invalid">Invalid ❌</MenuItem>
            </TextField>
            <TextField
              label="Remarks"
              fullWidth
              multiline
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              margin="normal"
              placeholder="Add remarks about validation..."
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
          </Box>
        </DialogContent>
        <DialogActions sx={{ 
          p: 2, 
          borderTop: '1px solid #e5e7eb',
          gap: 1,
        }}>
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
              bgcolor: '#16a34a',
              borderRadius: '8px',
              px: 3,
              '&:hover': {
                bgcolor: '#15803d',
              },
            }}
          >
            Save Validation
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttendanceValidation;