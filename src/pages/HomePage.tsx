import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Welcome to Cafe Employee Management System
      </Typography>
      <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
        Please navigate to the pages below
      </Typography>      
      <Button variant="contained" color="primary" sx={{ marginBottom: 2, width: 200 }}>
        <RouterLink to="/cafe" style={{ textDecoration: 'none', color: 'white' }}>
          Go to Cafe Page
        </RouterLink>
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginBottom: 2, width: 200 }}>
        <RouterLink to="/employees" style={{ textDecoration: 'none', color: 'white' }}>
          Go to Employees Page
        </RouterLink>
      </Button>
    </Box>
  );
};

export default HomePage;