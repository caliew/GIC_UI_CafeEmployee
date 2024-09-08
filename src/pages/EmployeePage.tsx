import { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { Box, Typography, Button, Link, TextField } from '@mui/material';

import { Link as RouterLink } from 'react-router-dom';
import { fetchEmployees, updateEmployee, createEmployee, deleteEmployee  } from '../reducers/employeesSlice';
import { useSelector, useDispatch } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const EmployeePage = () => {

  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [rowData,setRowData] = useState([]);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);


  useEffect(() => {
    if (employees && employees.employees) {
      const data = employees.employees.map((employee) => ({
        id: employee.id,
        name: employee.name,
        phone_number: employee?.phone_number,
        gender: employee?.gender,
        cafe_id: parseInt(employee?.cafe_id),
        email_address: employee?.email_address,
        start_date: employee.start_date !== null && employee.start_date !== undefined ? formatDate(employee.start_date) : '',
        days_worked: employee?.days_worked,
      }));
      setRowData(data);
    }
  }, [employees]);

  const formatDate = (date) => new Date(date).toISOString().split('T')[0];

  const columnDefs = [
    { field: 'name', headerName: 'Name',flex: 2 },
    { field: 'email_address', headerName: 'Email Address',flex: 2 },
    { field: 'gender', headerName: 'Gender',flex: 1 },
    { field: 'cafe_id', headerName: 'Cafe Id',flex: 1 },
    { field: 'phone_number', headerName: 'Phone', flex: 1 },
    { field: 'start_date', headerName: 'Start Date', flex: 1  },
    { field: 'days_worked', headerName: 'Days Worked', flex: 1  },  
    {
      field: 'actions',
      headerName: 'Actions',
      cellRenderer: (params) => (
        <div>
          <Button variant="contained" color="secondary" onClick={() => handleEdit(params.data)}>
            Edit
          </Button>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(params.data.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
  
  
  const gridOptions = {
    columnDefs: columnDefs,
    getRowHeight: (params) => {
      // return the height of the row based on the data
      return 50;
    },
    defaultColDef: {
      sortable: true,
      filter: true,
    },
  };
  console.log(employees)

  const handleSubmit = (values: any, { setSubmitting, resetForm }) => {
    console.log(values);
    if (editingEmployee) {
      dispatch(updateEmployee({ ...editingEmployee, ...values }));
      setEditingEmployee(null);
    } else {
      dispatch(createEmployee(values));
    }
    dispatch(fetchEmployees());
  };

  const handleDelete = (id) => {
    console.log(`..HANDLE DELETE...${id}`);
    dispatch(deleteEmployee(id));
    dispatch(fetchEmployees());
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleReset = () => {
    setEditingEmployee(null);
  };
  
  return (
    <Box sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Employee Page
      </Typography>
      <RouterLink to="/" style={{ textDecoration: 'none', color: 'blue' }}>
        <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
          Back to Home Page
        </Typography>
      </RouterLink>

      <hr/>

      <div
      className="ag-theme-alpine"
      style={{ height: '500px', width: '100%' }}
    >
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
        onRowClicked={(params) => {setEditingEmployee(params.data);}}
      />
    </div>

    <hr/>    
    
    <Formik
        enableReinitialize
        initialValues={{
          name: editingEmployee ? editingEmployee.name : '',
          email_address: editingEmployee ? editingEmployee.email_address : '',
          gender: editingEmployee ? editingEmployee.gender : '',
          phone_number: editingEmployee ? editingEmployee.phone_number : '',
          cafe_id : editingEmployee ? editingEmployee.cafe_id : '',
          start_date: editingEmployee ? editingEmployee?.start_date : ''
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          email_address: Yup.string().required('Description is required'),
          gender: Yup.string().required('Gender is required'),
          cafe_id: Yup.string().required('Case Id is required'),
          phone_number: Yup.string().required('Phone is required'),
          start_date: Yup.string().required('Start Date is required')
        })}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setValues, resetForm }) => (
          <Form>
            <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
              <div>{editingEmployee == null ? 'NEW EMPLOYEE' : 'EDIT EMPLOYEE'}</div>
            </Typography>
            <hr/>
            
            <div className='input-field'>
              <Field type="text" name="name" placeholder="Name" className="input-field"/>
              <ErrorMessage name="name" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="email_address" placeholder="Email" className="input-field"/>
              <ErrorMessage name="email_address" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="gender" placeholder="Gender" className="input-field"/>
              <ErrorMessage name="gender" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="phone_number" placeholder="phone_number" className="input-field"/>
              <ErrorMessage name="phone_number" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="cafe_id" placeholder="Cafe Id" className="input-field"/>
              <ErrorMessage name="cafe_id" component="div" className="error-message"/>
            </div>
            <div className='input-field'>
              <Field type="text" name="start_date" placeholder="StartDate" className="input-field"/>
              <ErrorMessage name="start_date" component="div" className="error-message"/>
            </div>
            
            <div>
              <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              {editingEmployee && (
                <Button variant="contained" color="primary" type="button" onClick={() => setEditingEmployee(null)}>
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

export default EmployeePage;