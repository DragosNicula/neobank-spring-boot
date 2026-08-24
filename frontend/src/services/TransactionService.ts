import api from "../services/Api";
import type { TransactionRequest } from '../types/TransactionRequest';
import type { TransactionResponse } from '../types/TransactionResponse';
import axios from 'axios';

export async function startTransaction(credentials: TransactionRequest): Promise<TransactionResponse> {
     try {
          const response = await api.post<TransactionResponse>("/transaction", credentials);
          return response.data;
     } catch (e) {
          if (axios.isAxiosError(e)) {
               const errorData = e.response?.data;
               throw new Error(errorData.message);
          }
          throw e;
     }
}

