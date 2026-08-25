import type { AuthContextType } from "../types/AuthContextType";
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({ children }: { children: React.ReactNode } ) {
     const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

     function checkLogin() {
          const value = localStorage.getItem("neobankLoginToken");
          setIsLoggedIn(!!value);
     }

     useEffect(() => {
          checkLogin();
     }, []);

     return (
          <AuthContext.Provider value= {{ isLoggedIn, checkLogin }} >
               {children}
          </AuthContext.Provider>
     )
}

export default AuthProvider;