export interface TextInputProps {
     value: string;
     label: string;
     field: string;
     handleInput: (field: string, value: string) => void;
     
}