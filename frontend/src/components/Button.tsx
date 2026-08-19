import type { ButtonProps } from '../types/ButtonProps';

function Button ({ type, disabled, children, onClick }: ButtonProps) {
     

     return(
          <div>
               <button type={type} disabled={disabled} onClick={onClick}>{children}</button>
          </div>
     )
}

export default Button;