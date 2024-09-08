import { configureStore, combineReducers } from '@reduxjs/toolkit';
import itemsReducer from './reducers/itemsSlice';
import postsReducer from './reducers/postsSlice';
import cafesReducer from './reducers/cafesSlice';
import employeesReducer from './reducers/employeesSlice';

const rootReducer = combineReducers({
  cafes: cafesReducer,
  employees: employeesReducer,
  posts: postsReducer
})

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
