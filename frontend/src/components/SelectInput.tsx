import type { SelectInputProps } from "../types/SelectInputProps";

function SelectInput({ value, label, field, options, handleInput }: SelectInputProps) {

     return (
          <div>
               <label>{label}</label>
               <select value={value} onChange={(e) => handleInput(field, e.target.value)}>
                    <option value="">-- Select --</option>
                    {options.map(option => (
                         <option key={option} value={option}>{option}</option>
                    ))}
               </select>
          </div>
     )
}

export default SelectInput;