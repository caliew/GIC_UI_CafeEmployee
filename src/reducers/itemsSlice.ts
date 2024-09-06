// itemsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: number;
  name: string;
  description: string;
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

// Async thunk for fetching items
export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  try {
    // Fetch items from the API (replace this with your actual API call)
    const response = await fetch('http://localhost:5000/api/items');
    const data = await response.json();
    console.log('ITEMS=',data)
    return data;
  } catch (error) {
    throw Error('Error fetching items: ' + error.message);
  }
});

// Async thunk for deleting an item
export const deleteItemAsync = createAsyncThunk('items/deleteItem', async (itemId: number) => {
    try {
      // Make a DELETE request to the API to delete the item
      const response = await fetch(`http://localhost:5000/api/items/${itemId}`, {method: 'DELETE'});
      // Check if the request was successful
      if (response.ok) {
        // Return the ID of the deleted item
        return itemId;
      } else {
        // If not successful, throw an error
        throw Error(`Failed to delete item with ID ${itemId}`);
      }
    } catch (error) {
      throw Error('Error deleting item: ' + error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Add other synchronous actions here if needed
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    editItem: (state, action: PayloadAction<Item>) => {
      // Find the index of the item to edit
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      
      if (index !== -1) {
        // Update the item with the new data
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      // Remove the item with the specified ID
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.fulfilled, (state, action) => {
        // Handle the fulfilled action (success)
        console.log('..FETCH ITEM FULFILLED..');
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        // Handle the rejected action (error)
        console.log('..FETCH ITEM REJECTED..');
        console.error('Error fetching items:', action.error);
      })
      .addCase(fetchItems.pending, (state, action) => {
        console.log('..FETCH ITEM PENDING..');
      });
  },
});

export const { addItem, editItem, deleteItem } = itemsSlice.actions;
export default itemsSlice.reducer;
