import React, { useContext, useEffect, useState } from 'react';
import { AuthApi, GenericResponse, LoginResponse, LoginViewModel, UserDto } from 'nest-starter/lib';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { environment } from '../config/environment';
import { getDataFromAPI } from '../config/api.conf';
import { JwtPayload } from '../types/payload';
import { AxiosResponse } from 'axios';


interface AuthContextProps {
    currentUser: UserDto | null,
    signIn: (email: string, password: string) => Promise<AxiosResponse<LoginResponse, any>>,
    signOut: () => Promise<void>,
}

const UserContext = React.createContext({} as AuthContextProps);

export function useAuth() {
    return useContext(UserContext);
}

export function AuthProvider({ children }: any) {
    const [currentUser, setCurrentUser] = useState<UserDto | null>({} as UserDto);
    // let contextUser = useContext(UserContext);

    useEffect(() => {
        getUserFromAccessToken(localStorage.getItem(environment.accessToken)!);
    }, []);

    async function signIn(email: string, password: string) {
        let response = {} as AxiosResponse<LoginResponse>;
        try {
            response = await getDataFromAPI<AuthApi, LoginResponse>(AuthApi, 'authControllerLogin', { loginViewModel: { username: email, password: password } as LoginViewModel });
            if (response.data.success) {
                localStorage.setItem(environment.accessToken, response.data.token!);
                Cookies.set(environment.refreshToken, response.data.refreshToken);
                getUserFromAccessToken(response.data.token!);
            }
        } catch (err: any) {
            console.log("🚀 ~ signIn ~ err", err.message);
        }
        return response;
    }

    async function signOut() {
        try {
            const response = await getDataFromAPI<AuthApi, GenericResponse>(AuthApi, 'authControllerLogout');
            if (response.data.success) {
                localStorage.removeItem(environment.accessToken);
                Cookies.remove(environment.refreshToken);
                setCurrentUser(null);
            }
        } catch (err: any) {
            console.log("🚀 ~ signOut ~ err", err.message);
        }
    }

    function getUserFromAccessToken(accessToken: string) {
        let user: UserDto | null;
        try {
            const decoded: JwtPayload = getDecodedAccessToken(accessToken);
            if (!decoded)
                return null;
            user = {
                disabled: decoded.disabled,
                mail: decoded.mail,
                username: decoded.username,
                id: decoded.id,
                rolesString: decoded.roles,
                firstname: decoded.firstname,
                lastname: decoded.lastname,
                imgUrl: decoded.imgUrl,
            };
            console.log("🚀 ~ getUserFromAccessToken ~ user", user);
            setCurrentUser(user);
        }
        catch (err) {
            user = null;
        }
    }

    function getDecodedAccessToken(token: string): JwtPayload {
        try {
            return jwtDecode(token);
        }
        catch (err) {
            return {} as JwtPayload;
        }
    }

    const value: AuthContextProps = {
        currentUser,
        signIn,
        signOut,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}