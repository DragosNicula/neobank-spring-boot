import type { TextInputProps } from '../types/TextInputProps';

function TextInput({ value, label, field, type, handleInput }: TextInputProps) {



     return(
          <div>
               <label>{label}</label>
               <input type={type || "text"} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ink transition-colors" value={value} onChange={(e) => handleInput(field, e.target.value)} />
          </div>
     )
}

export default TextInput;