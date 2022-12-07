import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AdminGuard } from './hooks/admin-guard';
import { AuthProvider } from './hooks/auth-provider';
import AdminHome from './pages/admin/AdminHome';
import UserEdit from './pages/admin/UserEdit';
import Users from './pages/admin/Users';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/public/Home';
import { RoutesList } from './routes/routes';
import { NoLoggedGuard } from './hooks/no-logged-guard';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route path={RoutesList.Home} element={<Home />} />
          {/* authentification */}
          <Route path={RoutesList.Login} element={<NoLoggedGuard><Login /></NoLoggedGuard>} />
          <Route path={RoutesList.Register} element={<NoLoggedGuard><Register /></NoLoggedGuard>} />
          <Route path={RoutesList.ResetPassword} element={<NoLoggedGuard><ResetPassword /></NoLoggedGuard>} />
          {/* admin */}
          <Route path={RoutesList.AdminHome} element={<AdminGuard><AdminHome /></AdminGuard>} />
          <Route path={RoutesList.AdminUsers} element={<AdminGuard><Users /></AdminGuard>} />
          <Route path={RoutesList.AdminUsers + '/:id'} element={<AdminGuard><UserEdit /></AdminGuard>} />
          <Route path={'*'} element={<Navigate replace to={RoutesList.Home} />} />
        </Routes >
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
