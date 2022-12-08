import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutesList } from '../routes/routes';
import { useAuth } from './auth-provider';


export function AdminGuard(children: any) /*I use any because i didn't find the good type */ {
    const { currentUser } = useAuth();
    const [check, setCheck] = useState<boolean>(false);

    useEffect(() => {
        if (currentUser?.rolesString?.find((x) => x === 'admin')) {
            setCheck(true);
        }
    }, [currentUser, check]);

    return check ? children : React.createElement(Navigate, { to: RoutesList.Home, replace: true });
}