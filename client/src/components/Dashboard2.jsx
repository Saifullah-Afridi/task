import React from "react";
import Grid from "@mui/material/Grid";
import { Link, Outlet } from "react-router-dom";
import { Stack, Typography } from "@mui/material";

const Dashboard2 = () => {
  return (
    <>
      <Typography variant="h4" textAlign="center" p={1}>
        Admin Dashboard
      </Typography>
      <Grid container>
        <Grid
          item
          xs={3}
          border="1px solid black"
          position="sticky"
          minHeight="100vh"
          p={2}
          px={3}
        >
          <Stack gap={1}>
            <Link
              to="add-customer"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Add Customer
              </Typography>
            </Link>
            <Link
              to="show-customers"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Typography
                sx={{
                  fontSize: "20px",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Show Customers
              </Typography>
            </Link>
          </Stack>
        </Grid>
        <Grid item xs={8} p={2} mr={4} border="1px solid black">
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard2;
