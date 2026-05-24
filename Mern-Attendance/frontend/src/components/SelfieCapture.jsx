import React, { useRef, useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { CameraAlt, Close } from "@mui/icons-material";
import Webcam from "react-webcam";

const SelfieCapture = ({ onCapture, buttonText = "Take selfie" }) => {
  const [open, setOpen] = useState(false);
  const webcamRef = useRef(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CameraAlt />}
        onClick={() => setOpen(true)}
        sx={{
          textTransform: "none",
          borderColor: "#14b8a6",
          color: "#14b8a6",
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "#14b8a6",
            color: "white",
            borderColor: "#14b8a6",
          },
          borderRadius: "8px",
        }}
      >
        {buttonText}
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#1f2937",
            borderBottom: "1px solid #e5e7eb",
            py: 1,
          }}
        >
          Capture Selfie
          <IconButton
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: "#9ca3af",
            }}
            onClick={() => setOpen(false)}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ py: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          </Box>
        </DialogContent>

        <DialogActions
          sx={{
            borderTop: "1px solid #e5e7eb",
            padding: 1,
            gap: 2,
            justifyContent: 'center',  
          }}
        >
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#dc2626",
              color: "#dc2626",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                borderColor: "#b91c1c",
                backgroundColor: "#fef2f2",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={capture}
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#16a34a",
              borderRadius: "8px",
              px: 3,
              "&:hover": {
                bgcolor: "#15803d",
              },
            }}
          >
            Capture
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SelfieCapture;
