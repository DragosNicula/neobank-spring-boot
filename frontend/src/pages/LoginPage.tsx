import { useState } from "react";
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import type { LoginRequest } from "../types/LoginRequest";
import { loginUser } from '../services/UserService';

function LoginPage() {
     const [loginRequest, setLoginRequest] = useState<LoginRequest>({
          username: "",
          password: ""
     })

     function handleFieldChange(field: string, value: string) {
          setLoginRequest({...loginRequest, [field]: value});
     }

     async function loginProcess() {
          try {
               const response = await loginUser(loginRequest);
               localStorage.setItem("neobankLoginToken", response); 
          } catch (e) {
               console.log("Error on login page: " + e);
          }
     }

     return (
          <div>
               <h1>This is login page.</h1>
               <TextInput label={"Username"} value={loginRequest.username} field={"username"} handleInput={handleFieldChange} />
               <TextInput label={"Password"} value={loginRequest.password} field={"password"} handleInput={handleFieldChange} />
               <Button type={"button"} children={"Login"} onClick={loginProcess}/>
          </div>
     )
}

export default LoginPage;