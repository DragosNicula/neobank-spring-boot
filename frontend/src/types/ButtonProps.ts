export interface ButtonProps {
     type: "button" | "submit" | "reset";
     disabled?: boolean;
     children: string;
     className?: string;
     variant: "primary" | "ghost" | "outline";
     onClick: () => void;
}