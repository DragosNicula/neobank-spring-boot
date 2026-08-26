import ProtectedRoute from "../components/ProtectedRoute";
import SelectInput from "../components/SelectInput";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import Card from '../components/Card';
import { getAllAccounts } from "../services/AccountService";
import type { TransactionRequest } from "../types/TransactionRequest";
import { startTransaction } from "../services/TransactionService";
import { useState, useEffect } from 'react';

function TransactionPage() {
     const [userAccounts, setUserAccounts] = useState<string[]>([]);
     const [errorMessage, setErrorMessage] = useState<string>("");
     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
     const [transactionStatus, setTransactionStatus] = useState<string>("");
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
               setIsSubmitting(true);
               setTransactionStatus("");
               setErrorMessage("");
               await startTransaction(transactionRequest);
               setTransactionStatus("Transaction complete...");
          } catch (e) {
               if (e instanceof Error) {
                    setErrorMessage(e.message);
                    setTransactionStatus("");
               }
          } finally {
               setIsSubmitting(false);
          }
     }

     return (
          <div className={"p-32"}>
               <ProtectedRoute>
                    <Card className={"flex flex-col gap-4"}>
                         <SelectInput value={transactionRequest.sourceAccount} field={"sourceAccount"} label={"Account"} options={userAccounts} handleInput={(handleFieldChange)} />
                         <SelectInput value={transactionRequest.type} field={"type"} label={"Transaction type"} options={["DEPOSIT", "WITHDRAWAL", "TRANSFER"]} handleInput={(handleFieldChange)} />
                         {transactionRequest.type === "TRANSFER" && <TextInput value={transactionRequest.destinationAccount} label={"Destination account"} field={"destinationAccount"} handleInput={handleFieldChange} />}
                         <TextInput value={transactionRequest.sum} label={"Sum"} field={"sum"} handleInput={handleFieldChange} />
                         <SelectInput value={transactionRequest.currency} field={"currency"} label={"Currency"} options={["RON", "EUR", "USD"]} handleInput={(handleFieldChange)} />
                         <Button className={"self-center"} type="button" variant={"primary"} disabled={isSubmitting} children={"Done"} onClick={createTransaction} />
                         <h3>{errorMessage}</h3>
                         {isSubmitting && <h3>Processing transaction...</h3>}
                         <h3 className={"self-center"}>{transactionStatus}</h3>
                    </Card>
               </ProtectedRoute>
          </div>
     )
}

export default TransactionPage;