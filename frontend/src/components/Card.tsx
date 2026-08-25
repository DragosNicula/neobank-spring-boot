import type { CardProps } from "../types/CardProps";

function Card({ children, className }: CardProps) {

     return(

          <div className={"bg-cardbox rounded-lg shadow-lg p-8 max-w-md mx-auto " + (className || "")} >
               {children}
          </div>
     )
}

export default Card;