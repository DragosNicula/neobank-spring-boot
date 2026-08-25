export interface TextInputProps {
     value: string | number;
     label: string;
     field: string;
     type?: string;
     handleInput: (field: string, value: string) => void;
     
}