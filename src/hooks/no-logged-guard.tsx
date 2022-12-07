import React, { useEffect, useState } from 'react';
import { useAuth } from './auth-provider';
import { RoutesList } from '../routes/routes';
import { Navigate } from 'react-router-dom';

export function NoLoggedGuard({ children }: any) {
    const { currentUser } = useAuth();
    const [userAlreadyLogged, setUserAlreadyLogged] = useState<boolean>(false);
    useEffect(() => {
        if (currentUser?.id) {
            setUserAlreadyLogged(true);
        } else setUserAlreadyLogged(false);
    }, [currentUser]);

    return userAlreadyLogged ? <Navigate to={RoutesList.Home} replace /> : children;
}