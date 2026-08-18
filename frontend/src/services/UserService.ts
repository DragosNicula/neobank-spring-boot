import type { UserRequest } from '../types/UserRequest';
import type { UserResponse } from '../types/UserResponse';
import api from './api';

export async function createUser(credentials: UserRequest): Promise<UserResponse> {
    const response = await api.post<UserResponse>('/users', credentials);
    console.log(response.data);
    return response.data;
}

