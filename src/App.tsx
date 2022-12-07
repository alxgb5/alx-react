import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AdminProvider } from './hooks/auth';
import AdminHome from './pages/admin/AdminHome';
import UserEdit from './pages/admin/UserEdit';
import Users from './pages/admin/Users';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/public/Home';
import { RoutesList } from './routes/routes';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path={RoutesList.Home} element={<Home />} />
        <Route path={RoutesList.Login} element={<Login />} />
        <Route path={RoutesList.Register} element={<Register />} />
        <Route path={RoutesList.ResetPassword} element={<ResetPassword />} />
        {/* admin */}
        <Route path={RoutesList.AdminHome} element={<AdminProvider><AdminHome /></AdminProvider>} />
        <Route path={RoutesList.AdminUsers} element={<AdminProvider><Users /></AdminProvider>} />
        <Route path={RoutesList.AdminUsers + '/:id'} element={<AdminProvider><UserEdit /></AdminProvider>} />
        <Route path={'*'} element={<Navigate replace to={RoutesList.Home} />} />
      </Routes >
    </BrowserRouter>
  );
}

export default App;
