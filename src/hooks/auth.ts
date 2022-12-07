import React, { useContext, useEffect, useState } from 'react';
import { AuthApi, GenericResponse, LoginResponse, LoginViewModel, UserDto } from 'nest-starter/lib';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { environment } from '../config/environment';
import { getDataFromAPI } from '../config/api.conf';

export interface JwtPayload {
    username: string;
    id: string;
    roles: string[];
    mail: string;
    firstname: string;
    lastname?: string;
    imgUrl?: string;
    disabled: boolean;
    iat?: string;
    exp?: string;
}

export interface JwtPayloadWithRt extends JwtPayload {
    refreshToken: string;
}
const UserContext = React.createContext({} as UserDto);
export function useAuth() {
    const [currentUser, setCurrentUser] = useState<UserDto | null>({} as UserDto);
    let contextUser = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem(environment.accessToken)) {
            setCurrentUser(getUserFromAccessToken(localStorage.getItem(environment.accessToken)!)!);
        }
    }, []);


    async function signIn(email: string, password: string) {
        try {
            const response = await getDataFromAPI<AuthApi, LoginResponse>(AuthApi, 'authControllerLogin', { loginViewModel: { username: email, password: password } as LoginViewModel });
            if (response.data.success) {
                localStorage.setItem(environment.accessToken, response.data.token!);
                Cookies.set(environment.refreshToken, response.data.refreshToken);
                setCurrentUser(getUserFromAccessToken(response.data.token!));
            }
        } catch (err: any) {
            console.log("🚀 ~ signIn ~ err", err.message);
        }
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


    return { currentUser, signIn, signOut, contextUser };
}

function getUserFromAccessToken(accessToken: string): UserDto | null {
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
    }
    catch (err) {
        user = null;
    }
    return user;
}

function getDecodedAccessToken(token: string): JwtPayload {
    try {
        return jwtDecode(token);
    }
    catch (err) {
        return {} as JwtPayload;
    }
}