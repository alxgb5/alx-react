import { AxiosResponse } from 'axios';
import { httpClient } from '../hooks/http-interceptor';
import { environment } from './environment';

export function getDataFromAPI<T, R>(apiClass: new (...args: any[]) => T, methodName: keyof T, ...args: any[]): AxiosResponse<R> {
    const api = new apiClass(undefined, environment.api_baseUrl, httpClient as any);
    return (api[methodName] as Function)(...args);
}

