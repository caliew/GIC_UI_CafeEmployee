import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import CafePage from './pages/CafePage'; // Import CafePage
import EmployeePage from './pages/EmployeePage'; // Import EmployeePage
import HomePage from './pages/HomePage'; // Import HomePage
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} /> // Route for HomePage
          <Route path="/cafe" element={<CafePage />} /> // Route for CafePage
          <Route path="/employees" element={<EmployeePage />} /> // Route for EmployeePage
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;