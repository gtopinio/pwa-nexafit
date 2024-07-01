interface FormField {
  type: 'text' | 'number' | 'email' | 'select' | 'radio' | 'checkbox' | 'array';
  name: string;
  label: string;
  validators?: any[];
  options?: { value: any; label: string }[];
  arrayConfig?: FormField[]; // For nested form arrays
}

interface FormConfig {
  name: string;
  fields: FormField[];
}
