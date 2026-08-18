import type { TextInputProps } from '../types/TextInputProps';

function TextInput({ value, label, field, handleInput }: TextInputProps) {



     return(
          <div>
               <label>{label}</label>
               <input value={value} onChange={(e) => handleInput(field, e.target.value)} />
          </div>
     )
}

export default TextInput;