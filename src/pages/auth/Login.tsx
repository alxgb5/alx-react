import './auth.scss';
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { LoginViewModel } from 'nest-starter/lib';
import * as Icons from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routes/routes';
import { useAuth } from '../../hooks/auth-provider';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginModel, setLoginModel] = useState<LoginViewModel>({ username: '', password: '' } as LoginViewModel);
    const [disabled, setDisabled] = useState(false);
    const [showError, setShowError] = useState(false);

    const { currentUser, signIn } = useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (currentUser?.id) {
    //         console.log("🚀 ~ useEffect ~ currentUser", currentUser);
    //         navigate(RoutesList.Home);
    //     }
    // }, [currentUser]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
        <>
            <div className='auth-container flex-center col'>
                <div className='card-container flex-center col'>
                    <h1 className='page-title'>Connexion {currentUser?.username}</h1>
                    <form className='form-container flex-center col' onSubmit={(e) => { onFormSubmit(e); }}>
                        <TextField name='email' type={'email'} variant='outlined' aria-label='Identifiant' placeholder='Identifiant' label='Identifiant' value={loginModel.username} onChange={(e) => { setLoginModel({ ...loginModel, username: e.target.value }); }} fullWidth disabled={disabled} />
                        <FormControl variant="outlined" fullWidth disabled={disabled}>
                            <InputLabel htmlFor="outlined-adornment-password">Mot de passe</InputLabel>
                            <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} value={loginModel.password}
                                onChange={(e) => { setLoginModel({ ...loginModel, password: e.target.value }); }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Icons.MdVisibility /> : <Icons.MdVisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mot de passe" placeholder='Mot de passe'
                            />
                        </FormControl>
                        <p className={showError ? 'error' : 'error-none'}>Identifiant ou mot de passe incorrect.</p>
                        <button className='auth-btn' type={'submit'} disabled={disabled}>Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;