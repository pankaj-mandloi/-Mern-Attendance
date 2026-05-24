import React, { useState } from "react";
import { Box, Typography, Grid, Paper, TextField, Button } from "@mui/material";
import { useSelector } from "react-redux";
import UserManagementTable from "../components/UserManagementTable";
import AttendanceValidation from "../components/AttendanceValidation";
import ReportTable from "../components/ReportTable";
import SelfieViewDialog from "../components/SelfieViewDialog";
import {
  useGetAllUsersQuery,
  useGetAllAttendanceQuery,
  useValidateAttendanceMutation,
  useGetDailyReportQuery,
} from "../services/api";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const { data: users, refetch: refetchUsers } = useGetAllUsersQuery();
  const { data: attendance, refetch: refetchAttendance } =
    useGetAllAttendanceQuery();
  const { data: report, refetch: refetchReport } =
    useGetDailyReportQuery(selectedDate);
  const [validateAttendance] = useValidateAttendanceMutation();

  const handleViewSelfie = (record) => {
    setSelectedAttendance(record);
    setDialogOpen(true);
  };

  const handleValidate = async (id, status, remarks) => {
    await validateAttendance({ id, status, remarks });
    refetchAttendance();
    refetchReport();
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    refetchReport();
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              {users?.length || 0}
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1, fontSize: "0.875rem" }}>
              Total Users
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              {attendance?.length || 0}
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1, fontSize: "0.875rem" }}>
              Total Attendance
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#16a34a",
                fontWeight: "bold",
                fontSize: "2rem",
              }}
            >
              {users?.filter((u) => u.role === "employee").length || 0}
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1, fontSize: "0.875rem" }}>
              Employees
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <UserManagementTable users={users} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              mb: 2,
              display: "flex",
              gap: 2,
              alignItems: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <TextField
              type="date"
              label="Select Date"
              value={selectedDate}
              onChange={handleDateChange}
              InputLabelProps={{ shrink: true }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  "& fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&:hover fieldset": {
                    borderColor: "#d1d5db",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#16a34a",
                    borderWidth: "2px",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#16a34a",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => refetchReport()}
              sx={{
                bgcolor: "#16a34a",
                textTransform: "none",
                borderRadius: "8px",
                px: 3,
                "&:hover": {
                  bgcolor: "#15803d",
                },
              }}
            >
              Generate Report
            </Button>
          </Paper>

          <ReportTable
            records={report?.report}
            date={selectedDate}
            onViewSelfie={handleViewSelfie}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <AttendanceValidation
            records={attendance}
            onValidate={handleValidate}
            onViewSelfie={handleViewSelfie}
          />
        </Grid>
      </Grid>

      <SelfieViewDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        attendance={selectedAttendance}
      />
    </Box>
  );
};

export default AdminDashboard;