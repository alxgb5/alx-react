import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../routes/routes';
import { useAuth } from './auth-provider';


export function AdminGuard({ children }: any) {
    const { currentUser } = useAuth();
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    useEffect(() => {
        if (!currentUser?.rolesString?.find(x => x === 'admin')) {
            setIsAdmin(false);
        } else setIsAdmin(true);
    }, [currentUser]);

    return isAdmin ? children : <Navigate to={RoutesList.Home} replace />;

}