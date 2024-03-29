import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { AuthProvider } from './hooks/auth-provider';
import AdminHome from './pages/admin/AdminHome';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ResetPassword from './pages/auth/ResetPassword';
import Home from './pages/public/Home';
import { RoutesList } from './routes/routes';
import { NoLoggedGuard } from './hooks/no-logged-guard';
import Layout from './components/layout/Layout';
import { RoutesProvider } from './routes/route-provider';
import { AdminGuard } from './hooks/admin-guard';
import Users from './pages/admin/Users';
import UserEdit from './pages/admin/UserEdit';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RoutesProvider>
          <Layout>
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
          </Layout>
        </RoutesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
