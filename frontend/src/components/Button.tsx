import type { ButtonProps } from '../types/ButtonProps';

function Button({ type, disabled, children, className, variant, onClick }: ButtonProps) {
     const variantStyles = {
          primary: "bg-ink border-2 border-ink hover:brightness-80 px-2 py-1 rounded-md text-mist ",
          outline: "border-2 border-ink hover:bg-ink hover:text-mist px-2 py-1 rounded-lg text-ink ",
          ghost: "hover:brightness-80 hover:underline px-2 pt-4 rounded-md text-ink font-medium "
     };

     return (
          <button className={variantStyles[variant] + (className || "")} type={type} disabled={disabled} onClick={onClick}>{children}</button>
     )
}

export default Button;