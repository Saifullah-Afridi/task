import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import axios from "axios";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const handleAddCustomer = async () => {
    if (name && phone && address && city) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/customers",
          {
            name,
            phone,
            address,
            city,
          }
        );
        setName("");
        setPhone("");
        setAddress("");
        setCity("");
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    }
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h5">Add New Customer</Typography>
      <Box
        sx={{ display: "flex", flexDirection: "column", mb: 4, width: "100%" }}
      >
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone"
          variant="outlined"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          margin="normal"
        />
        <TextField
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          margin="normal"
        />
        <Button variant="contained" onClick={handleAddCustomer} sx={{ mt: 2 }}>
          Add Customer
        </Button>
      </Box>
    </Box>
  );
};

export default AddCustomer;
