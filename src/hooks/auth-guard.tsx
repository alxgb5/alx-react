import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../routes/routes';
import { useAuth } from './auth-provider';

export function AuthGuard({ children }: any) {
    const { currentUser } = useAuth();
    const [userLogged, setUserLogged] = useState<boolean>(false);
    useEffect(() => {
        if (!currentUser?.id) {
            setUserLogged(false);
        } else setUserLogged(true);
    }, [currentUser]);

    return userLogged ? children : <Navigate to={RoutesList.Login} replace />;

}