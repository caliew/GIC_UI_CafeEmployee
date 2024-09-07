import React from 'react';
import { Box, Typography, Button, TextField, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const EmployeePage = () => {
  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Employee Page
      </Typography>
      <TextField label="Employee Name" variant="outlined" sx={{ marginBottom: 2, width: 300 }} />
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Add Employee
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginBottom: 2 }}>
        View Employees
      </Button>
      <RouterLink to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Back to Home Page
        </Typography>
      </RouterLink>
    </Box>
  );
};

export default EmployeePage;