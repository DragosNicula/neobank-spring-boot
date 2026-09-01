import ProtectedRoute from "../components/ProtectedRoute";
import { useState, useEffect } from 'react';
import { getAllAccounts } from '../services/AccountService';
import { getProfileData } from '../services/UserService';
import type { AccountResponse } from '../types/AccountResponse';
import type { UserProfile } from '../types/UserProfile';
import AccountCard from '../components/AccountCard';

function ProfilePage() {
     const [accounts, setAccounts] = useState<AccountResponse[]>([]);
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
                    </div>
               </ProtectedRoute>
          </div>
     )
}

export default ProfilePage;