export interface TransactionRequest {
    currency: string;
    type: string;
    sourceAccount: string;
    destinationAccount: string;
    sum: number;
}