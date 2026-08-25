import { useState, useContext } from "react";
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Card from '../components/Card';
import type { LoginRequest } from "../types/LoginRequest";
import { loginUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

function LoginPage() {
     const auth = useContext(AuthContext);
     const navigate = useNavigate();
     const [errorMessage, setErrorMessage] = useState<string>("");
     const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
     const [loginRequest, setLoginRequest] = useState<LoginRequest>({
          username: "",
          password: ""
     })

     function handleFieldChange(field: string, value: string) {
          setLoginRequest({ ...loginRequest, [field]: value });
     }

     async function loginProcess() {
          try {
               setIsSubmitting(true);
               setErrorMessage("");
               const response = await loginUser(loginRequest);
               localStorage.setItem("neobankLoginToken", response);
               auth?.checkLogin();
               navigate("/");
          } catch (e) {
               if (e instanceof Error) {
                    setErrorMessage(e.message);
               }
          } finally {
               setIsSubmitting(false);
          }
     }

     return (
          <div className="p-32">
               <Card className={"flex flex-col gap-4"}>
                    <TextInput label={"Username"} value={loginRequest.username} field={"username"} handleInput={handleFieldChange} />
                    <TextInput label={"Password"} type={"password"} value={loginRequest.password} field={"password"} handleInput={handleFieldChange} />
                    <Button className={"self-center"} variant={"primary"} type={"button"} disabled={isSubmitting} children={"Login"} onClick={loginProcess} />
                    <h3 className={"font-semibold text-alert "}>{errorMessage}</h3>
               </Card>
          </div>
     )
}

export default LoginPage;