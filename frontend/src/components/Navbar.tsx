import Button from "../components/Button";
import { logoutUser } from '../services/UserService';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';

function Navbar() {
     const auth = useContext(AuthContext);
     const navigate = useNavigate();

     function redirectUser(path: string) {
          navigate(path);
     }

     function startLogoutProcess() {
          logoutUser();
          auth?.checkLogin();
     }

     return (
          <div className="flex justify-between items-center bg-mist border-b-2 border-border-navbar">
               <div className="flex px-4 md:px-12 lg:px-64 items-center">
                    <div className="w-64 pb-2 pt-2">
                         <img src={logo} alt="Logo" />
                    </div>
                    <div className="flex px-2" >
                         <Button variant={"ghost"} type={"button"} children={"Home"} onClick={() => redirectUser("/")} />
                         <Button variant={"ghost"} type={"button"} children={"Transaction"} onClick={() => redirectUser("/transaction")} />
                         <Button variant={"ghost"} type={"button"} children={"Profile"} onClick={() => redirectUser("/profile")} />
                    </div>
               </div>

               <div className="flex px-4 md:px-12 lg:px-32">
                    {auth?.isLoggedIn ?
                         <Button variant={"primary"} type={"button"} children={"Logout"} onClick={startLogoutProcess} /> :
                         <div className="flex gap-2">
                              <Button variant={"outline"} type={"button"} children={"Login"} onClick={() => redirectUser("/login")} />
                              <Button variant={"primary"} type={"button"} children={"Register"} onClick={() => redirectUser("/register")} />
                         </div>
                    }
               </div>
          </div>
     )
}

export default Navbar;