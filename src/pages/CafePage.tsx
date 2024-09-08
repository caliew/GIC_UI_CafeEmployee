import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Link, TextField } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    dispatch(fetchCafes());
  }, [dispatch]);

  useEffect(() => {
    if (cafes && cafes.cafes) {
      const data = cafes.cafes.filter((cafe) => {
        return cafe.location.toLowerCase().includes(filterLocation.toLowerCase());
      });
      setRowData(data);
    }
  }, [cafes, filterLocation]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (editingCafe) {
      dispatch(updateCafe({ ...editingCafe, ...values }));
      setEditingCafe(null);
    } else {
      dispatch(createCafe(values));
      // resetForm();
    }
    dispatch(fetchCafes());
  };

  const handleDelete = (id) => {
    console.log(`..HANDLE DELETE...${id}`);
    dispatch(deleteCafe(id));
    dispatch(fetchCafes()); 
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
      <RouterLink to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Back to Home Page
        </Typography>
      </RouterLink>

      <hr/>

      <Typography variant="h5" component="h3" sx={{ marginBottom: 2 }}>
        Available Cafes:
      </Typography>
      <TextField
        label="Filter by Location"
        value={filterLocation}
        onChange={handleFilter}
        sx={{ marginBottom: 2 }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Logo</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.logo}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleEdit(row)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <hr/>

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
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              <div>{editingCafe == null ? 'NEW CAFE' : 'EDIT CAFE'}</div>
            </Typography>
            <hr/>

            <div className='input-field'>
              <Field type="text" name="name" placeholder="Name" className="input-field"/>
              <ErrorMessage name="name" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="description" placeholder="Description" className="input-field"/>
              <ErrorMessage name="description" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="logo" placeholder="Logo" className="input-field"/>
              <ErrorMessage name="logo" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="location" placeholder="Location" className="input-field"/>
              <ErrorMessage name="location" component="div" className="error-message"/>
            </div>

            <div>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              {editingCafe && (
                <Button variant="contained" color="primary" onClick={() => handleReset()}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>          

        )}
      </Formik>

    </Box>
  );
};

export default CafePage;