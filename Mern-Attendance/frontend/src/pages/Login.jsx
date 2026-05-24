import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  IconButton,
  InputAdornment,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLoginMutation } from "../services/api";
import { setCredentials } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const validateEmail = (value) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!value || value.trim() === "") {
      setEmailError("Email Address is required");
      return false;
    }
    if (!emailPattern.test(value)) {
      setEmailError("Enter a valid email (e.g., name@example.com)");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value) => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setError("");

    try {
      const result = await login({ email, password }).unwrap();
      dispatch(
        setCredentials({
          user: result.user,
          token: result.token,
        }),
      );

      if (result.user.role === "admin") {
        navigate("/admin");
      } else if (result.user.role === "manager") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      setError(err.data?.msg || "Login failed");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "400px",
          borderRadius: "16px",
          bgcolor: "white",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          sx={{
            fontWeight: "bold",
            mb: 3,
            color: "#1f2937",
            fontSize: "1.875rem",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
            disabled={isLoading}
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
                  borderColor: "#22c55e",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#6b7280",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#22c55e",
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            disabled={isLoading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={isLoading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
                  borderColor: "#22c55e",
                  borderWidth: "2px",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#6b7280",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#22c55e",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#16a34a",
              color: "white",
              py: 1.5,
              borderRadius: "8px",
              fontWeight: "medium",
              fontSize: "1rem",
              textTransform: "none",
              position: "relative",
              "&:hover": {
                bgcolor: "#15803d",
              },
              "&.Mui-disabled": {
                bgcolor: "#86efac",
                color: "white",
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <CircularProgress size={20} sx={{ color: "white" }} />
                <span>Logging in...</span>
              </Box>
            ) : (
              "Login"
            )}
          </Button>

          <Box textAlign="center">
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "#16a34a",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Don't have an account? Sign Up
              </Typography>
            </Link>
          </Box>
        </form>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          onClose={() => setOpenSnackbar(false)}
          sx={{ borderRadius: "8px" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;