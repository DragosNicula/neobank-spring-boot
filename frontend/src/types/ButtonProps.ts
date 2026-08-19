export interface ButtonProps {
     type: "button" | "submit" | "reset";
     disabled?: boolean;
     children: string;
     onClick: () => void;
}