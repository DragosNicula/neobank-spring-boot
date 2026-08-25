import type { SelectInputProps } from "../types/SelectInputProps";

function SelectInput({ value, label, field, options, handleInput }: SelectInputProps) {

     return (
          <div>
               <label>{label}</label>
               <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ink transition-colors" value={value} onChange={(e) => handleInput(field, e.target.value)}>
                    <option value="">-- Select --</option>
                    {options.map(option => (
                         <option key={option} value={option}>{option}</option>
                    ))}
               </select>
          </div>
     )
}

export default SelectInput;