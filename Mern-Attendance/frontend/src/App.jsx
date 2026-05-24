import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import { useGetMeQuery } from './services/api';
import { setCredentials, logout } from './store/slices/authSlice';

function App() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const { data, error, isLoading } = useGetMeQuery(undefined, {
    skip: !token || !!user,
  });

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ user: data, token }));
    }
    if (error) {
      dispatch(logout());
    }
  }, [data, error, dispatch, token]);

  if (token && !user && isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Loading...
      </div>
    );
  }

  if (token && user) {
    if (window.location.pathname === '/login' || window.location.pathname === '/register') {
      return <Navigate to="/" />;
    }

    return (
      <Routes>
        <Route path="/" element={
          <PrivateRoute>
            <Layout>
              {user?.role === 'admin' && <AdminDashboard />}
              {user?.role === 'manager' && <ManagerDashboard />}
              {user?.role === 'employee' && <EmployeeDashboard />}
            </Layout>
          </PrivateRoute>
        } />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/register" element={<Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;