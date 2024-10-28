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

const SignupForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: !fullName,
      email: !email,
      password: !password,
    };
    setErrors(newErrors);
    setErrorMessage("");

    if (!newErrors.fullName && !newErrors.email && !newErrors.password) {
      try {
        const res = await axios.post("http://localhost:3000/api/v1/users", {
          fullName,
          email,
          password,
        });
        console.log(res);
        if (res?.data) {
          navigate("/login");
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
          Sign Up
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
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            error={errors.fullName}
            helperText={errors.fullName ? "Full Name is required" : ""}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
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
            onChange={(e) => {
              setPassword(e.target.value);
              if (errorMessage) setErrorMessage("");
            }}
            error={errors.password}
            helperText={errors.password ? "Password is required" : ""}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Sign Up
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupForm;
