import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import { ChangeEventHandler, FC } from 'react';

interface CustomFormInputProps {
  value: string | number;
  name: string;
  containerClasses?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  type?: 'text' | 'number' | 'password';
  id?: string;
  onChange: ChangeEventHandler;
}

const CustomFormInput: FC<CustomFormInputProps> = ({
  value,
  name,
  containerClasses,
  placeholder,
  disabled,
  required,
  label,
  type = 'text',
  id,
  onChange,
}) => (
  <FormControl id={id ?? name} isRequired={required} className={containerClasses}>
    <FormLabel className="text-lg" htmlFor={id ?? name}>
      {label ?? name}
    </FormLabel>
    <Input
      className="shadow"
      id={id ?? name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      variant=""
      bg="white"
    />
  </FormControl>
);

export default CustomFormInput;
