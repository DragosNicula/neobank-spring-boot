import type { UserRequest } from '../types/UserRequest';
import type { UserResponse } from '../types/UserResponse';
import type { LoginRequest } from '../types/LoginRequest';
import api from './Api';
import axios from 'axios';


export async function createUser(credentials: UserRequest): Promise<UserResponse> {
    try {
        const response = await api.post<UserResponse>('/users', credentials);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorData = e.response?.data;
            throw new Error(errorData.message);
        }
        throw e;
    }
}

export async function loginUser(credentials: LoginRequest): Promise<string> {
    try {
        const response = await api.post<string>('/auth/login', credentials);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const errorData = e.response?.data;
            throw new Error(errorData.message);
        }
        throw e;
    }
}

export function logoutUser() {
    localStorage.removeItem("neobankLoginToken");
}
