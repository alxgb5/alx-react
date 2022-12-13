import React from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../routes/routes';
import { useAuth } from './auth-provider';

interface AuthGuardProps {
    children: React.FunctionComponentElement<any>;
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
    const { currentUser } = useAuth();
    const redirect = React.createElement(Navigate, { to: RoutesList.Login, replace: true });
    if (currentUser?.id) {
        return children;
    }
    return redirect;
};