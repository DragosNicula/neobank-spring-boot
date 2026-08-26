import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../services/AccountService';
import type { AccountResponse } from '../types/AccountResponse';
import AccountCard from '../components/AccountCard';

function ProfilePage() {
     const [accounts, setAccounts] = useState<AccountResponse[]>([]);
     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {

          async function getAccounts() {
               try {
                    const response = await getAllAccounts();
                    setAccounts(response);
               } catch (e) {
                    console.log("Error retrieving accounts: " + e);
               } finally {
                    setLoading(false);
               }
          }

          getAccounts();
     }, []);

     if (loading) {
          return (
               <div>
                    <ProtectedRoute>
                         <h1>Loading dashboard.</h1>
                    </ProtectedRoute>
               </div>
          )
     }

     return (
          <div>
               <ProtectedRoute>

                    {accounts.map(account => (
                         <AccountCard key={account.iban} currency={account.currency} iban={account.iban} sold={account.sold.toLocaleString()} />
                    ))}

               </ProtectedRoute>
          </div>
     )
}

export default ProfilePage;