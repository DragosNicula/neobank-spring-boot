import type { UserRequest } from '../types/UserRequest';
import type { UserResponse } from '../types/UserResponse';
import type { LoginRequest } from '../types/LoginRequest';
import api from './Api';

export async function createUser(credentials: UserRequest): Promise<UserResponse> {
    const response = await api.post<UserResponse>('/users', credentials);
    return response.data;
}

export async function loginUser(credentials: LoginRequest): Promise<string> {
    const response = await api.post<string>('/auth/login', credentials);
    return response.data;
}
