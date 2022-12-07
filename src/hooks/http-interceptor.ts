import * as Api from 'nest-starter/lib';
import axios, { AxiosInstance } from 'axios';
import { environment } from '../config/environment';
import Cookies from 'js-cookie';
import { getDataFromAPI } from '../config/api.conf';
import { AuthApi, AuthApiAuthControllerRefreshRequest, LoginResponse } from 'nest-starter/lib';

export const httpClient: AxiosInstance = axios.create({
    baseURL: environment.api_baseUrl,
});

async function refreshToken() {
    const response = await getDataFromAPI<AuthApi, LoginResponse>(AuthApi, 'authControllerRefresh', { token: Cookies.get(environment.refreshToken)! } as AuthApiAuthControllerRefreshRequest);
    if (response.data.success) {
        localStorage.setItem(environment.accessToken, response.data.token!);
        Cookies.set(environment.refreshToken, response.data.refreshToken);
    } else
        console.log("error");

};

httpClient.interceptors.request.use(config => {
    console.log('echo 1');

    const accessToken = localStorage.getItem(environment.accessToken);
    config.headers!.Authorization = `Bearer ${accessToken}`;
    return config;
}, error => {
    return Promise.reject(error);
});


httpClient.interceptors.response.use(response => {
    return response;
}, error => {
    console.log('echo 2');

    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshToken().then(() => {
            return httpClient(originalRequest);
        });
    }
    return Promise.reject(error);
});