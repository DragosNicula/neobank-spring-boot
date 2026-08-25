import Button from "../components/Button";
import { logoutUser } from '../services/UserService';
import { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

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
          <div>
               <h1>this is navBar</h1>
               <Button type={"button"} children={"Home"} onClick={() => redirectUser("/")} />
               <Button type={"button"} children={"Transaction"} onClick={() => redirectUser("/transaction")} />
               <Button type={"button"} children={"Profile"} onClick={() => redirectUser("/profile")} />
               {auth?.isLoggedIn ?
                    <Button type={"button"} children={"Logout"} onClick={startLogoutProcess} /> :
                    <div>
                         <Button type={"button"} children={"Login"} onClick={() => redirectUser("/login")} />
                         <Button type={"button"} children={"Register"} onClick={() => redirectUser("/register")} />
                    </div>
               }

          </div>
     )
}

export default Navbar;