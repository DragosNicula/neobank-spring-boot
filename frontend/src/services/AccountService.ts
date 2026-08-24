import api from './Api';
import type { AccountResponse } from '../types/AccountResponse';

export async function getAllAccounts(): Promise<AccountResponse[]> {
     const response = await api.get('/accounts');
     return response.data;
}