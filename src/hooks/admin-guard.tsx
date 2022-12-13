import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../routes/routes';
import { useAuth } from './auth-provider';

interface AdminGuardProps {
    children: React.FunctionComponentElement<any>;
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
    console.log('hello');

    const { currentUser } = useAuth();
    const redirect = React.createElement(Navigate, { to: RoutesList.Home, replace: true });
    if (currentUser?.rolesString?.find((x) => x === 'admin')) {
        return children;
    }
    return redirect;
};