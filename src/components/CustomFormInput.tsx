import { FC, ChangeEventHandler } from 'react';

interface CustomFormInputProps {
  value: string | number;
  placeholder: string;
  name: string;
  disabled?: boolean;
  label?: string;
  type?: 'text' | 'number' | 'password';
  id?: string;
  onChange: ChangeEventHandler;
}

const CustomFormInput: FC<CustomFormInputProps> = ({
  value,
  placeholder,
  name,
  disabled,
  label,
  type = 'text',
  id,
  onChange,
}) => (
  <p className="my-9">
    <label htmlFor={id ?? name}>{label ?? name}</label>
    <input
      className="block my-1 px-3 w-full h-8 rounded-2xl shadow focus:outline-none focus:ring"
      type={type}
      name={name}
      id={id ?? name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  </p>
);

export default CustomFormInput;
