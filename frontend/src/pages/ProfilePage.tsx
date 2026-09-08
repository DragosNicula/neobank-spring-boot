import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../services/AccountService';
import { getProfileData } from '../services/UserService';
import { getAllTransactionsForUser } from '../services/TransactionService';
import type { AccountResponse } from '../types/AccountResponse';
import type { UserProfile } from '../types/UserProfile';
import type { TransactionResponse } from "../types/TransactionResponse";
import AccountCard from '../components/AccountCard';
import Toggle from "../components/Toggle";

function ProfilePage() {
     const [activeView, setActiveView] = useState<string>("Account Details");
     const [accounts, setAccounts] = useState<AccountResponse[]>([]);
     const [transactions, setTransactions] = useState<TransactionResponse[]>([]);
     const [profileData, setProfileData] = useState<UserProfile>({
          username: "",
          address: {
               street: "",
               town: "",
               country: "",
               postalCode: "",
          }
     });
     const [loading, setLoading] = useState<boolean>(true);

     useEffect(() => {

          async function getProfilePageData() {
               try {
                    const accountsResponse = await getAllAccounts();
                    const profileDataResponse = await getProfileData();
                    setAccounts(accountsResponse);
                    setProfileData(profileDataResponse);
               } catch (e) {
                    console.log("Error retrieving accounts: " + e);
               } finally {
                    setLoading(false);
               }
          }

          getProfilePageData();
     }, []);


     async function handleActiveView(value: string) {
          setActiveView(value);
          if (value === "Transaction History") {
               try {
                    const response = await getAllTransactionsForUser();
                    setTransactions(response);
               } catch (e) {
                    console.log("Error loading transactions: " + e);
               }
          }
     }

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
          <div className="p-4 md:p-12">
               <ProtectedRoute>
                    <div className={"flex justify-center p-4"}>
                         <Toggle options={["Account Details", "Transaction History"]} value={activeView} onToggle={handleActiveView} />
                    </div>
                    {activeView === "Account Details" ?
                         <div className="max-w-4xl mx-auto">
                              <div className="bg-cardbox rounded-lg shadow-lg p-8 mb-6 flex items-center gap-6">
                                   <div className="w-20 h-20 rounded-full bg-ink flex items-center justify-center text-cardbox text-2xl font-medium">
                                        {profileData.username.charAt(0).toUpperCase()}
                                   </div>
                                   <div>
                                        <h2 className="text-xl font-medium text-ink">{profileData.username}</h2>
                                        <p className="text-sm text-slate">
                                             {profileData.address.street}, {profileData.address.town}, {profileData.address.country} {profileData.address.postalCode}
                                        </p>
                                   </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   {accounts.map(account => (
                                        <AccountCard key={account.iban} currency={account.currency} iban={account.iban} sold={account.sold.toLocaleString()} />
                                   ))}
                              </div>
                         </div> : <div>
                              <div className="max-w-4xl mx-auto">
                                   <div className="bg-cardbox rounded-lg shadow-lg overflow-hidden">
                                        {transactions.map((t, index) => (
                                             <div
                                                  key={index}
                                                  className="flex justify-between items-center px-6 py-4 border-b border-mist last:border-b-0"
                                             >
                                                  <div>
                                                       <p className={
                                                            t.type === "DEPOSIT" ? "text-sm font-medium text-success" :
                                                                 t.type === "WITHDRAWAL" ? "text-sm font-medium text-alert" :
                                                                      "text-sm font-medium text-ink"
                                                       }>{t.type}</p>
                                                       <p className="text-xs text-slate">{new Date(t.transactionDate).toLocaleString('en-GB', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                       })}</p>
                                                       <p className="text-xs text-slate">
                                                            {t.sourceAccount}{t.destinationAccount && ` → ${t.destinationAccount}`}
                                                       </p>
                                                  </div>
                                                  <span className="text-sm font-medium text-ink">
                                                       {t.sum.toLocaleString()} {t.currency}
                                                  </span>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                         </div>
                    }
               </ProtectedRoute>
          </div>
     )
}

export default ProfilePage;