export interface ToggleProps {
     options: string[];
     value: string;
     className?: string;
     onToggle: (value: string) => void;
}