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

const ShowCustomers = () => {
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
    <Box>
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

export default ShowCustomers;
