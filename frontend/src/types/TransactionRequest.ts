export interface TransactionRequest {
    type: string;
    sourceAccount: string;
    destinationAccount: string;
    sum: number;
}