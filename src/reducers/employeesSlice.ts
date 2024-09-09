// employeesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Employee {
  id: number;
  name: string;
  email_address: string;
  phone_number: string;
  gender : string;
  start_date: string;
  days_worked: string;
}

interface EmployeesState {
  employees: Employee[];
  employeesOnCafeID: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
  employeesOnCafeID: []
};

// Async thunk for fetching Employee
export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  try {
    const response = await fetch('http://localhost:3000/employees');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
});

// Async thunk for fetching employees by cafe ID
export const fetchEmployeesOnCafeID = createAsyncThunk('employees/fetchEmployeesOnCafeID', async (cafeID: number) => {
  try {
    const response = await fetch(`http://localhost:3000/employees?cafe=${cafeID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching employees on cafe ID:', error);
    throw error;
  }
});

// Async thunk for creating a new Employee
export const createEmployee = createAsyncThunk('employees/createEmployee', async (Employee: Employee) => {
    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Employee),
      });
      const data = await response.json();
      return { ...Employee, ...data }; // Return the updated Employee data
    } catch (error) {
      console.error('Error creating Employee:', error);
      throw error;
    }
  });
  
  // Async thunk for updating a Employee
  export const updateEmployee = createAsyncThunk('employees/updateEmployee', async (Employee: Employee) => {
    try {
      Employee.id = Employee.id || -1;
      console.log(`http://localhost:3000/employees/${Employee.id}/cafes/${Employee.cafe_id}`);
      console.log(Employee)
      const response = await fetch(`http://localhost:3000/employees/${Employee.id}/cafes/${Employee.cafe_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Employee),
      });
      const data = await response.json();
      return { ...Employee, ...data }; // Return the updated Employee data
    } catch (error) {
      console.error('Error updating Employee:', error);
      throw error;
    }
  });
  
  // Async thunk for deleting a Employee
  export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/employees/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        return id; // Return the ID of the deleted Employee
      } else {
        throw new Error(`Failed to delete Employee with ID ${id}`);
      }
    } catch (error) {
      console.error('Error deleting Employee:', error);
      throw error;
    }
  });

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Add other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload;
      })
      .addCase(fetchEmployeesOnCafeID.fulfilled, (state, action) => {
        console.log(action)
        state.employeesOnCafeID = action.payload;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.employees.push(action.payload);
        console.log(`..createEmployee FULLFILLED..`, state.employees);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((employee) => employee.id === action.payload.id);
        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const index = state.employees.findIndex((employee) => employee.id === action.payload);
        if (index !== -1) {
          state.employees.splice(index, 1);
        }
      })
      // ...
  },
});

export default employeesSlice.reducer;