import type { ToggleProps } from '../types/ToggleProps';

function Toggle({ options, value, className, onToggle }: ToggleProps) {
     return (
          <div className="flex">
               {options.map((option, index) => (
                    <button
                         key={option}
                         onClick={() => onToggle(option)}
                         className={
                              (value === option ? "bg-ink text-mist" : "border-2 border-ink text-ink hover:bg-ink hover:text-mist") +
                              " px-4 py-2 " +
                              (index === 0 ? "rounded-l-md" : "rounded-r-md") + (className || "")
                         }
                    >
                         {option}
                    </button>
               ))}
          </div>
     );
}

export default Toggle;