import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const SelfieViewDialog = ({ open, onClose, attendance }) => {
  if (!attendance) return null;

  const hasPunchInImage =
    attendance.punchInSelfie &&
    attendance.punchInSelfie !== "dummy_selfie_data";
  const hasPunchOutImage =
    attendance.punchOutSelfie &&
    attendance.punchOutSelfie !== "dummy_selfie_data";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          color: "#1f2937",
          borderBottom: "1px solid #e5e7eb",
          py: 1,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Attendance Details - {attendance.userId?.name}
        <IconButton
          onClick={onClose}
          sx={{
            color: "#9ca3af",
            "&:hover": {
              backgroundColor: "#f3f4f6",
            },
          }}
          size="small"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 3, px: 3 }}>
        <Grid container spacing={3} alignItems="stretch">
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                p: 2,
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#6b7280", fontWeight: 600, mb: 1 }}
              >
                Punch In Selfie
              </Typography>

              {hasPunchInImage ? (
                <>
                  <Box
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      p: 1,
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <img
                      src={attendance.punchInSelfie}
                      alt="Punch In Selfie"
                      style={{
                        width: "100%",
                        height: 250,
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: "block",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{ mt: 1.5, color: "#6b7280", display: "block" }}
                  >
                    Time:{" "}
                    {attendance.punchInTime &&
                      new Date(attendance.punchInTime).toLocaleString()}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", display: "block" }}
                  >
                    Location: {attendance.punchInLocation?.lat?.toFixed(4)},{" "}
                    {attendance.punchInLocation?.lng?.toFixed(4)}
                  </Typography>
                </>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Typography sx={{ color: "#9ca3af" }}>
                    No punch in record
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex" }}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                p: 2,
                backgroundColor: "#fff",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ color: "#6b7280", fontWeight: 600, mb: 1 }}
              >
                Punch Out Selfie
              </Typography>

              {hasPunchOutImage ? (
                <>
                  <Box
                    sx={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                      p: 1,
                      backgroundColor: "#f9fafb",
                    }}
                  >
                    <img
                      src={attendance.punchOutSelfie}
                      alt="Punch Out Selfie"
                      style={{
                        width: "100%",
                        height: 250,
                        objectFit: "cover",
                        borderRadius: "8px",
                        display: "block",
                      }}
                    />
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{ mt: 1.5, color: "#6b7280", display: "block" }}
                  >
                    Time:{" "}
                    {attendance.punchOutTime &&
                      new Date(attendance.punchOutTime).toLocaleString()}
                  </Typography>

                  <Typography
                    variant="caption"
                    sx={{ color: "#6b7280", display: "block" }}
                  >
                    Location: {attendance.punchOutLocation?.lat?.toFixed(4)},{" "}
                    {attendance.punchOutLocation?.lng?.toFixed(4)}
                  </Typography>
                </>
              ) : (
                <Box
                  sx={{
                    p: 3,
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Typography sx={{ color: "#9ca3af" }}>
                    No punch out record
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Working Hours Summary - Full width below both selfies */}
        {(attendance.totalHours > 0 || attendance.status) && (
          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "#f0fdf4",
              borderRadius: "12px",
              border: "1px solid #dcfce7",
            }}
          >
            <Grid container spacing={2}>
              {attendance.totalHours > 0 && (
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#166534", fontWeight: 600 }}
                  >
                    Total Working Hours
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#16a34a", fontWeight: "bold" }}
                  >
                    {attendance.totalHours?.toFixed(2)} hours
                  </Typography>
                </Grid>
              )}
              <Grid item xs={6}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "#166534", fontWeight: 600 }}
                >
                  Work Status
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: attendance.totalHours >= 8 ? "#16a34a" : "#eab308",
                    fontWeight: "bold",
                  }}
                >
                  {attendance.totalHours >= 8 ? "Completed ✓" : "Incomplete"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        )}

        {/* Validation Status */}
        {(attendance.status || attendance.remarks) && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              bgcolor:
                attendance.status === "valid"
                  ? "#f0fdf4"
                  : attendance.status === "invalid"
                    ? "#fef2f2"
                    : "#f9fafb",
              borderRadius: "12px",
              border: `1px solid ${
                attendance.status === "valid"
                  ? "#dcfce7"
                  : attendance.status === "invalid"
                    ? "#fecaca"
                    : "#e5e7eb"
              }`,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{
                color:
                  attendance.status === "valid"
                    ? "#16a34a"
                    : attendance.status === "invalid"
                      ? "#dc2626"
                      : "#6b7280",
                fontWeight: 600,
                mb: 1,
              }}
            >
              Validation Status
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  bgcolor:
                    attendance.status === "valid"
                      ? "#16a34a"
                      : attendance.status === "invalid"
                        ? "#dc2626"
                        : "#eab308",
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                  color:
                    attendance.status === "valid"
                      ? "#16a34a"
                      : attendance.status === "invalid"
                        ? "#dc2626"
                        : "#92400e",
                }}
              >
                Status: {attendance.status || "pending"}
              </Typography>
            </Box>

            {attendance.remarks && (
              <Typography
                variant="body2"
                sx={{
                  color: "#6b7280",
                  mt: 1,
                  pl: 2,
                  borderLeft: "2px solid #e5e7eb",
                }}
              >
                Remarks: {attendance.remarks}
              </Typography>
            )}
          </Box>
        )}
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          px: 3,
          borderTop: "1px solid #e5e7eb",
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            bgcolor: "#dc2626",
            color: "white",
            borderRadius: "8px",
            px: 3,
            "&:hover": {
              bgcolor: "#b91c1c",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SelfieViewDialog;
