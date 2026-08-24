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
     const [errorMessage, setErrorMessage] = useState<string>("");
     const [transactionRequest, setTransactionRequest] = useState<TransactionRequest>({
          currency: "",
          type: "",
          sourceAccount: "",
          destinationAccount: "",
          sum: 0
     });

     useEffect(() => {
          async function fetchAccounts() {
               try {
                    const response = await getAllAccounts();
                    const ibanArray = response.map(account => account.iban);
                    setUserAccounts(ibanArray);
               } catch (e) {
                    console.log(e);
               }
               
          }
          fetchAccounts();
     }, []);



     function handleFieldChange(field: string, value: string) {
          setTransactionRequest({ ...transactionRequest, [field]: value });
     }

     async function createTransaction() {
          try {
               await startTransaction(transactionRequest);
               setErrorMessage("");
          } catch (e) {
               if (e instanceof Error) {
                    setErrorMessage(e.message);
               }
          }
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
                    <h3>{errorMessage}</h3>
               </ProtectedRoute>
          </div>
     )
}

export default TransactionPage;