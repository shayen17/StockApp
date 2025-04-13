// src/routes/Routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ShowProducts from '../pages/ShowProducts';
import Home from '../pages/Home';
import CreateProduct from '../pages/CreateProduct';
import Login from '../pages/Login'; 
import PrivateRoute from '../components/PrivateRoute'; 

const AppRoutes = () => {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Ruta pública o semi-pública */}
      <Route path="/" element={<Home />} />

      {/* Rutas protegidas */}
      <Route
        path="/create"
        element={
          <PrivateRoute>
            <CreateProduct />
          </PrivateRoute>
        }
      />
      <Route
        path="/show"
        element={
          <PrivateRoute>
            <ShowProducts />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

