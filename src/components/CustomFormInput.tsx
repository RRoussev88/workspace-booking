import { FC, ChangeEventHandler } from 'react';

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
  <p className={containerClasses}>
    <label className="text-lg" htmlFor={id ?? name}>
      {required && <span className="text-red-500 font-bold">* </span>}
      {label ?? name}
    </label>
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
