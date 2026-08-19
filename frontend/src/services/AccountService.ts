import api from './Api';
import type { AccountResponse } from '../types/AccountResponse';

export async function getAllAccounts(): Promise<AccountResponse[]> {
     const response = await api.get('/accounts');
     console.log(response.data);
     return response.data;
}