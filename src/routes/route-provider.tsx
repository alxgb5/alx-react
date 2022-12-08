import React, { useContext, useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/auth-provider';
import { RoutesList, RoutesListWrapper } from './routes';

interface RouteContextProps {
    currentRoute: keyof typeof RoutesList,
    getCurrentRouteLabel: (value: string) => string,
    getAdminRoutes: () => { label: string; key: string; icon: IconType; }[];
    getPublicRoute: () => { label: string; key: string; icon: IconType; }[];
}

const RouteContext = React.createContext({} as RouteContextProps);

export function useRoute() {
    return useContext(RouteContext);
}

export function RoutesProvider({ children }: any) {
    const [currentRoute, setCurrentRoute] = useState<keyof typeof RoutesList>('Home');
    const location = useLocation();
    const { currentUser } = useAuth();

    const baseRoutesList = RoutesListWrapper.filter((x) => x.key !== RoutesList.Maintenance);

    useEffect(() => {
        setCurrentRoute(location.pathname as keyof typeof RoutesList);
    }, [location]);

    function getCurrentRouteLabel(value: string): string {
        const routeLabel = RoutesListWrapper.find((x) => x.key === value)?.label;
        if (routeLabel)
            return routeLabel;
        else
            return '';
    }

    function getAdminRoutes(): { label: string; key: string; icon: IconType; }[] {
        const adminRoutes = baseRoutesList.filter((x) => { return !x.key.includes('auth'); });
        return adminRoutes.filter((x) => { return x.key.includes('admin'); });
    }

    function getPublicRoute(): { label: string; key: string; icon: IconType; }[] {
        if (currentUser?.id)
            return baseRoutesList.filter((x) => { return !x.key.includes('admin') || x.key === RoutesList.AdminHome; }).filter((x) => { return !x.key.includes('auth'); });
        else {
            const publicRoutes = baseRoutesList.filter((x) => { return !x.key.includes('auth') || x.key === RoutesList.Login; });
            return publicRoutes.filter((x) => { return !x.key.includes('admin'); }).filter((x) => x.key !== RoutesList.Profile);
        }
    }


    const value: RouteContextProps = {
        currentRoute,
        getCurrentRouteLabel,
        getAdminRoutes,
        getPublicRoute
    };


    return (
        <RouteContext.Provider value={value}>
            {children}
        </RouteContext.Provider>
    );
}