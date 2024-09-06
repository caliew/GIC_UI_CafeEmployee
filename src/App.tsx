import React from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  return (
    <div className="App">
      <p>CAFE EMPLOYEE MANAGEMENT SYSTEM</p>
      <p>REACT.JS TYPESCRIPT REDUX AND REDUX-THUNK</p>
      <ItemForm />
      <ItemList />
    </div>
  );
}

export default App;
