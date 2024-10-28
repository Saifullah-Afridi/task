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

const Dashboard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/customers"
        );
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

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
        setCustomers((prevCustomers) => [...prevCustomers, response.data]);
        setName("");
        setPhone("");
        setAddress("");
        setCity("");
      } catch (error) {
        console.error("Error adding customer:", error);
      }
    }
  };

  const handleDeleteCustomer = async (customerId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/customers/${customerId}`
      );
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer._id !== customerId)
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography border="2px solid green" p={2} mb={1} variant="h3">
        Admin Dashboard
      </Typography>
      <Typography variant="h5">Add New Customer</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", mb: 4 }}>
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

      <Typography variant="h5" sx={{ mt: 4 }}>
        Customer List
      </Typography>
      <Grid container spacing={2}>
        {customers.map((customer) => (
          <Grid item xs={12} sm={6} md={4} key={customer._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{customer.name}</Typography>
                <Typography>Phone: {customer.phone}</Typography>
                <Typography>Address: {customer.address}</Typography>
                <Typography>City: {customer.city}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDeleteCustomer(customer._id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
