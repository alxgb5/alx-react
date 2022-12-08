import './auth.scss';
import {
    Paper,
    createStyles,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
    Autocomplete,
    Loader,
} from '@mantine/core';
import { LoginViewModel } from 'nest-starter/lib';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth-provider';
import { RoutesList } from '../../routes/routes';

const useStyles = createStyles((theme) => ({
    wrapper: {
        height: '100%',
        backgroundSize: 'cover',
        backgroundImage:
            'url(https://images.unsplash.com/photo-1484242857719-4b9144542727?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1280&q=80)',
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        height: '100%',
        maxWidth: 500,
        paddingTop: 80,

        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
            maxWidth: '100%',
        },
    },

    title: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    logo: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        width: 120,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
}));

export const Login = () => {
    const { classes } = useStyles();
    const [loginModel, setLoginModel] = useState<LoginViewModel>({ username: '', password: '' } as LoginViewModel);
    const [disabled, setDisabled] = useState(false);
    const [showError, setShowError] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();


    // autocomplete
    const timeoutRef = useRef<number>(-1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);

    const handleChange = (val: string) => {
        window.clearTimeout(timeoutRef.current);
        setLoginModel({ ...loginModel, username: val });
        setData([]);

        if (val.trim().length === 0 || val.includes('@')) {
            setLoading(false);
        } else {
            setLoading(true);
            timeoutRef.current = window.setTimeout(() => {
                setLoading(false);
                setData(['gmail.com', 'outlook.com', 'yahoo.com'].map((provider) => `${val}@${provider}`));
            }, 1000);
        }
    };
    // autocomplete end

    async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        setDisabled(true);
        e.preventDefault();
        try {
            const response = await signIn(loginModel.username, loginModel.password);
            if (!response.data.success) {
                setDisabled(false);
            } else {
                navigate(RoutesList.Home);
            }
        } catch (error: any) {
            console.log("🚀 ~ onFormSubmit ~ error", error.message);
            setDisabled(false);
            setShowError(true);
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Bon retour sur alx-react !
                </Title>

                <form onSubmit={(e) => { onFormSubmit(e); }}>
                    <Autocomplete value={loginModel.username} data={data} onChange={handleChange} rightSection={loading ? <Loader size={16} /> : null} label="Adresse email"
                        placeholder="Votre adresse email" size="md" type={'email'} disabled={disabled} />
                    <PasswordInput label="Mot de passe" placeholder="Votre mot de passe" mt="md" size="md" value={loginModel.password} onChange={(e) => { setLoginModel({ ...loginModel, password: e.target.value }); }} disabled={disabled} />
                    {showError ? <p className='error'>Email ou mot de passe incorrect !</p> : <></>}
                    <Button fullWidth mt="xl" size="md" type='submit'>
                        {disabled ? <Loader size={30} color={'gray'} /> : <>Connexion</>}
                    </Button>
                </form>
                <Text align="center" mt="md">
                    Pas encore de compte ?
                    <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
                        Inscrivez-vous
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default Login;