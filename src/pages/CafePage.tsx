import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Link, TextField } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { fetchCafes, createCafe, updateCafe, deleteCafe } from '../reducers/cafesSlice';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const CafePage = () => {
  const dispatch = useDispatch();
  const cafes = useSelector((state) => state.cafes);
  const [editingCafe, setEditingCafe] = useState(null);
  const [filterLocation, setFilterLocation] = useState('');
  const [cafesFetched, setCafesFetched] = useState(false);

  useEffect(() => {
    if (!cafesFetched) {
      dispatch(fetchCafes());
      setCafesFetched(true);
    }
  }, [cafesFetched, dispatch]);

  useEffect(() => {
    console.log(cafes);
    if (cafes.cafes.length > 0) {
      setCafesFetched(true);
    }
  }, [cafes]);

  const handleSubmit = (values, { setSubmitting }) => {
    if (editingCafe) {
      console.log(editingCafe, values);
      dispatch(updateCafe({ ...editingCafe, ...values }));
      setEditingCafe(null);
    } else {
      dispatch(createCafe(values));
    }
    dispatch(fetchCafes());
    setSubmitting(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCafe(id));
  };

  const handleEdit = (cafe) => {
    setEditingCafe(cafe);
  };

  const handleReset = () => {
    setEditingCafe(null);
  };

  const handleFilter = (event) => {
    setFilterLocation(event.target.value);
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Cafe Page
      </Typography>
      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Order Coffee
      </Button>
      <Button variant="contained" color="secondary" sx={{ marginBottom: 2 }}>
        View Menu
      </Button>
      <RouterLink to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Back to Home Page
        </Typography>
      </RouterLink>
      <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
        Available Cafes:
      </Typography>
      <TextField
        label="Filter by Location"
        value={filterLocation}
        onChange={handleFilter}
        sx={{ marginBottom: 2 }}
      />
      <ul>
        {cafes.cafes
          .filter((cafe) => cafe.location.includes(filterLocation))
          .map((cafe) => (
            <li key={cafe.id}>
              <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
                {cafe.name} - {cafe.location}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleEdit(cafe)}>
                Edit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(cafe.id)}>
                Delete
              </Button>
              <RouterLink to={`/employees/${cafe.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
                <Typography variant="body1" component="p" sx={{ marginBottom: 1 }}>
                  View Employees
                </Typography>
              </RouterLink>
            </li>
          ))}
      </ul>
      <Formik
        enableReinitialize
        initialValues={{
          name: editingCafe ? editingCafe.name : '',
          description: editingCafe ? editingCafe.description : '',
          logo: editingCafe ? editingCafe.logo : '',
          location: editingCafe ? editingCafe.location : '',
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          description: Yup.string().required('Description is required'),
          logo: Yup.string().required('Logo is required'),
          location: Yup.string().required('Location is required'),
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setValues, resetForm }) => (
          <Form>
            <Field type="text" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" />
            <Field type="text" name="description" placeholder="Description" />
            <ErrorMessage name="description" component="div" />
            <Field type="text" name="logo" placeholder="Logo" />
            <ErrorMessage name="logo" component="div" />
            <Field type="text" name="location" placeholder="Location" />
            <ErrorMessage name="location" component="div" />
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            {editingCafe && (
              <Button type="button" onClick={() => handleReset()}>
                New Cafe
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CafePage;