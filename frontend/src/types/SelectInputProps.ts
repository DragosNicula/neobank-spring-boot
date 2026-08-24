export interface SelectInputProps {
     value: string;
     label: string;
     field: string;
     options: string[];
     handleInput: (field: string, value: string) => void;
}