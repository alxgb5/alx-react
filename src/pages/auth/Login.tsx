import './auth.scss';
import { useRef, useState } from 'react';
import { LoginViewModel } from 'nest-starter/lib';
import * as Icons from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RoutesList } from '../../routes/routes';
import { useAuth } from '../../hooks/auth-provider';
import { Autocomplete, Loader } from '@mantine/core';

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loginModel, setLoginModel] = useState<LoginViewModel>({ username: '', password: '' } as LoginViewModel);
    const [disabled, setDisabled] = useState(false);
    const [showError, setShowError] = useState(false);

    const { currentUser, signIn } = useAuth();
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
        <>
            <div className='auth-container flex-center col'>
                <div className='card-container flex-center col'>
                    <h1 className='page-title'>Connexion {currentUser?.username}</h1>
                    <form className='form-container flex-center col' onSubmit={(e) => { onFormSubmit(e); }}>
                        <Autocomplete value={loginModel.username} data={data} onChange={handleChange} rightSection={loading ? <Loader size={16} /> : null} label="Identifiant"
                            placeholder="Identifiant" />
                        <p className={showError ? 'error' : 'error-none'}>Identifiant ou mot de passe incorrect.</p>
                        <button className='auth-btn' type={'submit'} disabled={disabled}>Se connecter</button>
                    </form>
                </div>
            </div>
        </>
    );
};
export default Login;