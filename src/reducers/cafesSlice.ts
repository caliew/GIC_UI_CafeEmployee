// cafesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Cafe {
  id: number;
  name: string;
  description: string;
  logo: string;
  location: string;
}

interface CafesState {
  cafes: Cafe[];
}

const initialState: CafesState = {
  cafes: [],
};

// Async thunk for fetching cafes
export const fetchCafes = createAsyncThunk('cafes/fetchCafes', async () => {
  try {
    const response = await fetch('http://localhost:3000/cafes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cafes:', error);
    throw error;
  }
});

// Async thunk for creating a new cafe
export const createCafe = createAsyncThunk('cafes/createCafe', async (cafe: Cafe) => {
  try {
    const response = await fetch('http://localhost:3000/cafes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cafe),
    });
    const data = await response.json();
    return { ...cafe, ...data }; // Return the updated cafe data
  } catch (error) {
    console.error('Error creating cafe:', error);
    throw error;
  }
});

// Async thunk for updating a cafe
export const updateCafe = createAsyncThunk('cafes/updateCafe', async (cafe: Cafe) => {
  try {
    const response = await fetch(`http://localhost:3000/cafes/${cafe.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cafe),
    });
    const data = await response.json();
    return { ...cafe, ...data }; // Return the updated cafe data
  } catch (error) {
    console.error('Error updating cafe:', error);
    throw error;
  }
});

// Async thunk for deleting a cafe
export const deleteCafe = createAsyncThunk('cafes/deleteCafe', async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3000/cafes/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      return id; // Return the ID of the deleted cafe
    } else {
      throw new Error(`Failed to delete cafe with ID ${id}`);
    }
  } catch (error) {
    console.error('Error deleting cafe:', error);
    throw error;
  }
});

const cafesSlice = createSlice({
  name: 'cafes',
  initialState,
  reducers: {
    // Add other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCafes.fulfilled, (state, action) => {
        state.cafes = action.payload;
      })
      .addCase(createCafe.fulfilled, (state, action) => {
        state.cafes.push(action.payload);
        console.log(`..createCafe FULLFILLED..`, state.cafes);
      })
      .addCase(updateCafe.fulfilled, (state, action) => {
        const index = state.cafes.findIndex((cafe) => cafe.id === action.payload.id);
        if (index !== -1) {
          state.cafes[index] = action.payload;
        }
      })
      .addCase(deleteCafe.fulfilled, (state, action) => {
        const index = state.cafes.findIndex((cafe) => cafe.id === action.payload);
        if (index !== -1) {
          state.cafes.splice(index, 1);
        }
      })
  },
});

export default cafesSlice.reducer;