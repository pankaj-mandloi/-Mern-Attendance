import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { useSelector } from "react-redux";
import PunchCard from "../components/PunchCard";
import AttendanceTable from "../components/AttendanceTable";
import OvertimeRequest from "../components/OvertimeRequest";
import OvertimeList from "../components/OvertimeList";
import {
  useGetMyAttendanceQuery,
  useGetMyOvertimeQuery,
} from "../services/api";

const EmployeeDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const { data: attendance, refetch: refetchAttendance } =
    useGetMyAttendanceQuery();

  const { data: overtime, refetch: refetchOvertime } =
    useGetMyOvertimeQuery();

  const handlePunchSuccess = () => {
    refetchAttendance();
  };

  const handleOvertimeSuccess = () => {
    refetchOvertime();
  };

  const totalHours =
    attendance?.reduce((sum, record) => sum + (record.totalHours || 0), 0) || 0;

  const completedDays =
    attendance?.filter((record) => record.totalHours >= 8).length || 0;

  return (
    <Box>
      <Grid container spacing={6} sx={{ mb: 3 }} alignItems="stretch">
        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: "12px", height: "100%" }}>
                  <Typography variant="h4" sx={{ color: "#16a34a", fontWeight: "bold" }}>
                    {attendance?.length || 0}
                  </Typography>
                  <Typography sx={{ color: "#6b7280", mt: 1 }}>
                    Total Days
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: "12px", height: "100%" }}>
                  <Typography variant="h4" sx={{ color: "#16a34a", fontWeight: "bold" }}>
                    {totalHours.toFixed(1)} hrs
                  </Typography>
                  <Typography sx={{ color: "#6b7280", mt: 1 }}>
                    Total Hours
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Paper sx={{ p: 2, textAlign: "center", borderRadius: "12px", height: "100%" }}>
                  <Typography variant="h4" sx={{ color: "#16a34a", fontWeight: "bold" }}>
                    {completedDays}
                  </Typography>
                  <Typography sx={{ color: "#6b7280", mt: 1 }}>
                    Completed Days
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: "flex" }}>
          <Box sx={{ width: "100%" }}>
            <PunchCard onPunchSuccess={handlePunchSuccess} />
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <OvertimeRequest onRequestSuccess={handleOvertimeSuccess} />
        </Grid>

        <Grid item xs={12} md={4}>
          <OvertimeList requests={overtime} />
        </Grid>

        <Grid item xs={12} md={4}>
          <AttendanceTable records={attendance} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeDashboard;