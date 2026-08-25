import type { ButtonProps } from '../types/ButtonProps';

function Button ({ type, disabled, children, className, onClick }: ButtonProps) {
     

     return(
          <div>
               <button className={className} type={type} disabled={disabled} onClick={onClick}>{children}</button>
          </div>
     )
}

export default Button;