import ProtectedRoute from "../components/ProtectedRoute";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { getAllAccounts } from "../services/AccountService";
import type { TransactionRequest } from "../types/TransactionRequest";
import { startTransaction } from "../services/TransactionService";
import { useState, useEffect } from 'react';

function TransactionPage() {
     const [userAccounts, setUserAccounts] = useState<string[]>([]);
     const [transactionRequest, setTransactionRequest] = useState<TransactionRequest>({
          currency: "",
          type: "", 
          sourceAccount: "",
          destinationAccount: "",
          sum: 0
     });

     useEffect(() => {
          async function fetchAccounts() {
               const response = await getAllAccounts();
               const ibanArray = response.map(account => account.iban);
               setUserAccounts(ibanArray);
          }
          fetchAccounts();
     }, []);



     function handleFieldChange(field: string, value: string) {
          console.log(field + " " + value);
          setTransactionRequest({ ...transactionRequest, [field]: value });
     }

     async function createTransaction() {
          console.log(JSON.stringify(transactionRequest));
          await startTransaction(transactionRequest);
     }

     return (
          <div>
               <ProtectedRoute>
                    <h1>This is transaction page.</h1>
                    <SelectInput value={transactionRequest.sourceAccount} field={"sourceAccount"} label={"Account"} options={userAccounts} handleInput={(handleFieldChange)} />
                    <SelectInput value={transactionRequest.type} field={"type"} label={"Transaction type"} options={["DEPOSIT", "WITHDRAWAL", "TRANSFER"]} handleInput={(handleFieldChange)} />
                    <SelectInput value={transactionRequest.currency} field={"currency"} label={"Currency"} options={["RON", "EUR", "USD"]} handleInput={(handleFieldChange)} />
                    <TextInput value={transactionRequest.sum} label={"Sum"} field={"sum"} handleInput={handleFieldChange} />
                    {transactionRequest.type === "TRANSFER" && <TextInput value={transactionRequest.destinationAccount} label={"Destination account"} field={"destinationAccount"} handleInput={handleFieldChange} />}
                    <Button type="button" children={"Done"} onClick={createTransaction} />
               </ProtectedRoute>
          </div>
     )
}

export default TransactionPage;