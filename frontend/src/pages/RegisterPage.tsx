import { useState } from 'react';
import type { UserRequest } from '../types/UserRequest';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import { createUser } from '../services/UserService';


function RegisterPage() {
     const [user, setUser] = useState<UserRequest>({ 
          username: "", 
          password: "", 
          street: "",
          town: "", 
          country: "", 
          postalCode: "" 
     });

     function handleFieldChange(field: string, value: string) {
          setUser({ ...user, [field]: value });
     }

     async function registerProcess() {
          try {
               await createUser(user);
          } catch (e) {
               console.log("Error on register: " + e);
          }
     }

     return (
          <div>
               <h1>This is register page.</h1>
               <TextInput label={"Username"} value={user.username} field={"username"} handleInput={handleFieldChange} />
               <TextInput label={"Password"} value={user.password} field={"password"} handleInput={handleFieldChange} />
               <TextInput label={"Street"} value={user.street} field={"street"} handleInput={handleFieldChange} />
               <TextInput label={"Town"} value={user.town} field={"town"} handleInput={handleFieldChange} />
               <TextInput label={"Country"} value={user.country} field={"country"} handleInput={handleFieldChange} />
               <TextInput label={"PostalCode"} value={user.postalCode} field={"postalCode"} handleInput={handleFieldChange} />
               <Button type={"button"} disabled={false} children={"Register"} onClick={registerProcess} />
          </div>
     )
}

export default RegisterPage;