import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: !email,
      password: !password,
    };
    setErrors(newErrors);
    setErrorMessage("");

    if (!newErrors.email && !newErrors.password) {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/v1/users/login",
          { email, password },
          { withCredentials: true }
        );

        if (res?.data) {
          navigate("/dashboard2");
        }
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        {errorMessage && (
          <Typography color="error" variant="body1" sx={{ mb: 2 }}>
            {errorMessage}
          </Typography>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            helperText={errors.email ? "Email is required" : ""}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link component={RouterLink} to="/  " underline="hover">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;
