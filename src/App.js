import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import ReceptionistDashboard from './components/ReceptionistDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import HomePage from './components/HomePage';

const App = () => {
  const PrivateRoute = ({ children, role }) => {
    const token = localStorage.getItem('token');
    if (!token) return <Navigate to="/login" />;
    const userRole = JSON.parse(atob(token.split('.')[1])).role;
    return userRole === role ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/receptionist-dashboard"
          element={
            <PrivateRoute role="receptionist">
              <ReceptionistDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor-dashboard"
          element={
            <PrivateRoute role="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
