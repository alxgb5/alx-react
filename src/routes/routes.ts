import { FaHome, FaSignInAlt, FaSignOutAlt, FaUserCircle, FaUsers } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import { MdAdminPanelSettings, MdPassword, MdSettings, MdVerified } from 'react-icons/md';

export const RoutesList = {
    // Public
    Home: '/',
    Maintenance: '/maintenance',

    Login: '/auth/login',
    Register: '/auth/register',
    ActivateAccount: '/auth/confirm-account',
    ResetPassword: '/auth/reset-password',

    // auth
    Profile: '/profile',

    // Admin
    AdminHome: 'admin/home',
    AdminUsers: '/admin/users',
    AdminSettings: '/admin/settings',
};

export const RoutesListWrapper: { label: string, key: string, icon: IconType, }[] = [
    {
        key: RoutesList.Home,
        label: "Accueil",
        icon: FaHome,
    },
    {
        key: RoutesList.Login,
        label: "Connexion",
        icon: FaSignInAlt,
    },
    {
        key: RoutesList.Register,
        label: "Inscription",
        icon: FaSignOutAlt,
    },
    {
        key: RoutesList.ResetPassword,
        label: "Mot de passe oublié",
        icon: MdPassword,
    },
    {
        key: RoutesList.ActivateAccount,
        label: "Activation du compte",
        icon: MdVerified,
    },
    {
        key: RoutesList.Maintenance,
        label: "Maintenance",
        icon: FaHome,
    },
    {
        key: RoutesList.Profile,
        label: "Profil",
        icon: FaUserCircle,
    },
    // Admin
    {
        key: RoutesList.AdminHome,
        label: "Administration",
        icon: MdAdminPanelSettings,
    },
    {
        key: RoutesList.AdminUsers,
        label: "Utilisateurs",
        icon: FaUsers,
    },
    {
        key: RoutesList.AdminSettings,
        label: "Paramètres",
        icon: MdSettings,
    }
];