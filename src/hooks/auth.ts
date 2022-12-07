import React, { useContext, useEffect, useState } from 'react';
import * as Api from 'nest-starter/lib/';
import { UserDto } from 'nest-starter/lib';
import Cookies from 'js-cookie';
import jwtDecode from "jwt-decode";
import { environment } from '../config/environment';

const apiConf = new Api.Configuration({ basePath: environment.api_baseUrl });

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
    const [currentUser, setCurrentUser] = useState<Api.UserDto | null>({} as UserDto);
    let contextUser = useContext(UserContext);

    useEffect(() => {
        if (localStorage.getItem(environment.accessToken)) {
            setCurrentUser(getUserFromAccessToken(localStorage.getItem(environment.accessToken)!)!);
        }
    }, []);


    function signIn(email: string, password: string) {
        const request = new Api.AuthApi(apiConf).authControllerLogin({ loginViewModel: { username: email, password: password } });
        request.then((response) => {
            if (response.data.success) {
                localStorage.setItem(environment.accessToken, response.data.token!);
                Cookies.set(environment.refreshToken, response.data.refreshToken);
                setCurrentUser(getUserFromAccessToken(response.data.token!));
            }
        }, (error) => {
            console.log(error);
        });

    }

    function signOut() {
        const request = new Api.AuthApi(apiConf).authControllerLogout();
        request.then((response) => {
            if (response.data.success) {
                localStorage.removeItem(environment.accessToken);
                Cookies.remove(environment.refreshToken);
                setCurrentUser(null);
            }
        }, (error) => {
            console.log(error);
        });
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