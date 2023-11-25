import React from "react";
import TodoApp from "./TodoApp";
import Login from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>} /> 
      <Route path="/todoapp" element={<TodoApp />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
