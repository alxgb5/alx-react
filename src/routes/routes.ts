export const RoutesList = {
    // Public
    Home: '/',
    Login: 'login',
    Register: 'register',
    ActivateAccount: 'confirm-account',
    ResetPassword: 'reset-password',
    Maintenance: 'maintenance',
    Profile: 'profile',

    // Admin
    AdminHome: 'admin/home',
    AdminUsers: 'admin/users',
    AdminSettings: 'admin/settings',
};

export const RoutesListWrapper = [
    {
        key: RoutesList.Home,
        label: "Accueil"
    },
    {
        key: RoutesList.Login,
        label: "Connexion"
    },
    {
        key: RoutesList.Register,
        label: "Inscription"
    },
    {
        key: RoutesList.ResetPassword,
        label: "Mot de passe oublié"
    },
    {
        key: RoutesList.ActivateAccount,
        label: "Activation du compte"
    },
    {
        key: RoutesList.Maintenance,
        label: "Maintenance"
    },
    {
        key: RoutesList.Profile,
        label: "Profil"
    },
    // Admin
    {
        key: RoutesList.AdminHome,
        label: "Accueil"
    },
    {
        key: RoutesList.AdminUsers,
        label: "Utilisateurs"
    },
    {
        key: RoutesList.AdminSettings,
        label: "Paramètres"
    }
];