// postsSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  date: string;
  task: string;
}

interface PostState {
  posts: Post[];
}

const initialState: PostState = {
  posts: [],
};

// Async thunk for fetching items
export const fetchPosts = createAsyncThunk('items/fetchPosts', async () => {
    try {
      // Fetch items from the API (replace this with your actual API call)
      const response = await fetch('http://localhost:5000/api/posts');
      const data = await response.json();
      console.log('POSTS',data);
      return data;
    } catch (error) {
      throw Error('Error fetching posts: ' + error.message);
    }
  });
  
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Add other synchronous actions here if needed
    addPost: (state, action: PayloadAction<Item>) => {
    },
    editPost: (state, action: PayloadAction<Item>) => {
    },
    deletePost: (state, action: PayloadAction<number>) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // Handle the fulfilled action (success)
        console.log('..FETCH POSTS FULFILLED..');
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        // Handle the rejected action (error)
        console.log('..FETCH POSTS REJECTED..');
        console.error('Error fetching items:', action.error);
      })
      .addCase(fetchPosts.pending, (state, action) => {
        console.log('..FETCH POSTS PENDING..');
      });
  },
});

export const { addPost, editPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
