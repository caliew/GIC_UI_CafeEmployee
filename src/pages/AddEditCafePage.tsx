import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  name: Yup.string().min(6, 'Name must be at least 6 characters').max(10, 'Name must be at most 10 characters').required('Name is required'),
  description: Yup.string().max(256, 'Description must be at most 256 characters').required('Description is required'),
  logo: Yup.mixed().test('fileSize', 'Logo must be at most 2MB', (value) => {
    if (!value.length) return true;
    return value[0].size <= 2000000;
  }),
  location: Yup.string().required('Location is required'),
});

const AddEditCafePage = ({ cafe, isEdit, onClose }) => {
  const navigate = useNavigate();
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: cafe?.name || '',
      description: cafe?.description || '',
      logo: cafe?.logo || '',
      location: cafe?.location || '',
    },
  });

  const onSubmit = async (data) => {
    if (isEdit) {
      // Call PUT/café API
      console.log('PUT/café API call', data);
    } else {
      // Call POST/café API
      console.log('POST/café API call', data);
    }
    onClose();
  };

  const handleCancel = () => {
    if (Object.keys(errors).length === 0) {
      onClose();
    } else {
      // Warn user if there are unsaved changes on the page before navigating away
      if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
        onClose();
      }
    }
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        {isEdit ? 'Edit Café' : 'Add Café'}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField
              label="Name"
              {...field}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              label="Description"
              {...field}
              error={Boolean(errors.description)}
              helperText={errors.description?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Controller
          name="logo"
          control={control}
          render={({ field }) => (
            <input type="file" {...field} />
          )}
        />
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <TextField
              label="Location"
              {...field}
              error={Boolean(errors.location)}
              helperText={errors.location?.message}
              sx={{ marginBottom: 2 }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ marginBottom: 2 }}>
          Submit
        </Button>
        <Button type="button" variant="contained" color="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </form>
    </Box>
  );
};

export default AddEditCafePage;