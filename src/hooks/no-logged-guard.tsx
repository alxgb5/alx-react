import React from 'react';
import { useAuth } from './auth-provider';
import { RoutesList } from '../routes/routes';
import { Navigate } from 'react-router-dom';

interface NoLoggedGuardProps {
    children: React.FunctionComponentElement<any>;
}

export const NoLoggedGuard = ({ children }: NoLoggedGuardProps) => {
    const { currentUser } = useAuth();
    const redirect = React.createElement(Navigate, { to: RoutesList.Home, replace: true });
    if (!currentUser?.id) {
        return children;
    }
    return redirect;
};