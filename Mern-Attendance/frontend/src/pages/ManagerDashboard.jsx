import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import TeamAttendanceTable from "../components/TeamAttendanceTable";
import PendingOvertimeList from "../components/PendingOvertimeList";
import SelfieViewDialog from "../components/SelfieViewDialog";
import {
  useGetTeamAttendanceQuery,
  useGetPendingOvertimeQuery,
  useApproveOvertimeMutation,
  useRejectOvertimeMutation,
} from "../services/api";

const ManagerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: attendance, refetch: refetchAttendance } =
    useGetTeamAttendanceQuery();
  const { data: pendingOT, refetch: refetchOT } = useGetPendingOvertimeQuery();
  const [approveOvertime] = useApproveOvertimeMutation();
  const [rejectOvertime] = useRejectOvertimeMutation();

  const handleViewSelfie = (record) => {
    setSelectedAttendance(record);
    setDialogOpen(true);
  };

  const handleApprove = async (id, remarks) => {
    await approveOvertime({ id, remarks });
    refetchOT();
    refetchAttendance();
  };

  const handleReject = async (id, remarks) => {
    await rejectOvertime({ id, remarks });
    refetchOT();
  };

  const teamSize = attendance?.filter((a) => a.userId).length || 0;

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              backgroundColor: "#ffffff",
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
              {pendingOT?.length || 0}
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1, fontSize: "0.875rem" }}>
              Pending Overtime
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              backgroundColor: "#ffffff",
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

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              textAlign: "center",
              borderRadius: "12px",
              boxShadow:
                "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
              backgroundColor: "#ffffff",
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
              {teamSize}
            </Typography>
            <Typography sx={{ color: "#6b7280", mt: 1, fontSize: "0.875rem" }}>
              Team Members
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <PendingOvertimeList
            requests={pendingOT}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <TeamAttendanceTable
            records={attendance}
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

export default ManagerDashboard;