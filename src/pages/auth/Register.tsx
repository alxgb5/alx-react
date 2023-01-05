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
    TextInput,
} from '@mantine/core';
import { AuthApi, GetUsersResponse, LoginResponse, RegisterRequest, UsersApi } from 'nest-starter/lib';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routes/routes';
import { PasswordChecker } from '../../components/PasswordChecker';
import { getDataFromAPI } from '../../config/api.conf';

const useStyles = createStyles((theme) => ({

    wrapper: {
        height: '100%',
        backgroundSize: 'cover',
    },

    form: {
        borderRight: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
            }`,
        height: '100%',
        maxWidth: 500,
        paddingTop: 80,
        overflow: 'auto',

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

export const Register = () => {
    const { classes } = useStyles();
    const [registerModel, setRegisterModel] = useState<RegisterRequest>({ username: '', password: '', mail: '', firstName: '', lastName: '' } as RegisterRequest);
    const [tempPassword, setTempPassword] = useState<string>('');
    const [checkTempPassword, setCheckTempPassword] = useState<string>('');
    const [disabled, setDisabled] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showErrorPassword, setShowErrorPassword] = useState(false);

    const navigate = useNavigate();


    // autocomplete
    const timeoutRef = useRef<number>(-1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);

    const handleChange = (val: string) => {
        window.clearTimeout(timeoutRef.current);
        setRegisterModel({ ...registerModel, mail: val });
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

    function checkPasswordValuesCorrect(): boolean {
        return tempPassword === checkTempPassword;
    }

    async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!registerModel.firstName || !registerModel.lastName || !registerModel.mail || !tempPassword) {
            return;
        }
        if (!checkPasswordValuesCorrect()) {
            setShowErrorPassword(true);
            return;
        }
        const _username = registerModel.firstName!.toLocaleLowerCase();
        setRegisterModel({ ...registerModel, password: tempPassword, username: _username });
        try {
            setDisabled(true);
            const response = await getDataFromAPI<UsersApi, GetUsersResponse>(UsersApi, 'usersControllerGetAll', {});
            setDisabled(false);
            if (!response.data.success) {
                console.log(response.data.message);
            } else
                console.log("🚀 ~ getUsers ~ response", response.data.success);
        } catch (error: any) {
            setShowError(true);
        }
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                    Bienvenue sur alx-react !
                </Title>

                <form onSubmit={(e) => { onFormSubmit(e); }} method='POST'>
                    <TextInput name='firstName' value={registerModel.firstName} onChange={(e) => { setRegisterModel({ ...registerModel, firstName: e.target.value }); }} label='Prénom' placeholder='Votre prénom' size='md' disabled={disabled}></TextInput>
                    <TextInput name='lastName' value={registerModel.lastName} onChange={(e) => { setRegisterModel({ ...registerModel, lastName: e.target.value }); }} label='Nom' placeholder='Votre nom' size='md' mt={'md'} disabled={disabled}></TextInput>
                    <Autocomplete value={registerModel.mail} data={data} onChange={handleChange} rightSection={loading ? <Loader size={16} /> : null} label="Adresse email"
                        placeholder="Votre adresse email" size="md" type={'email'} disabled={disabled} mt='md' name='email' />
                    <PasswordChecker value={tempPassword} onChange={(e) => { setTempPassword(e.target.value); }} disabled={disabled} name={'password'}></PasswordChecker>
                    <PasswordInput label="Confirmer mot de passe" placeholder="Confirmer mot de passe" mt="md" size="md" value={checkTempPassword} onChange={(e) => { setCheckTempPassword(e.target.value); }} disabled={disabled} name='password_check' />
                    {showErrorPassword ? <p className='error'>Les mots de passe ne correspondent pas.</p> : <></>}
                    <Button fullWidth mt="xl" size="md" type='submit'>
                        {disabled ? <Loader size={30} color={'gray'} /> : <>Connexion</>}
                    </Button>
                </form>
                <Text align="center" mt="md">
                    Vous possédez un compte ?
                    <Anchor<'a'> href='#' weight={700} onClick={(event) => navigate(RoutesList.Login)}>
                        Connectez-vous
                    </Anchor>
                </Text>
            </Paper>
        </div>
    );
};

export default Register;