import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { ChangeEventHandler, FC } from 'react';

interface CustomTextAreaProps {
  value: string | number;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  label?: string;
  rows?: number;
  id?: string;
  onChange: ChangeEventHandler;
}

const CustomFormInput: FC<CustomTextAreaProps> = ({
  value,
  name,
  placeholder,
  disabled,
  label,
  rows,
  id,
  onChange,
}) => (
  <FormControl id={id ?? name}>
    <FormLabel className="text-lg" htmlFor={id ?? name}>
      {label ?? name}
    </FormLabel>
    <Textarea
      className="bg-white shadow"
      id={id ?? name}
      rows={rows ?? 3}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      variant=""
    />
  </FormControl>
);

export default CustomFormInput;
