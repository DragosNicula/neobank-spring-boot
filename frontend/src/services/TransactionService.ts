import api from "../services/Api";
import type { TransactionRequest } from '../types/TransactionRequest';
import type { TransactionResponse } from '../types/TransactionResponse';

export async function startTransaction(credentials: TransactionRequest): Promise<TransactionResponse> {
     const response = await api.post<TransactionResponse>("/transaction", credentials);
     console.log("This is transaction service response: " + JSON.stringify(response.data));
     return response.data;
}

