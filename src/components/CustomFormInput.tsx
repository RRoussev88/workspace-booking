import { FC, ChangeEventHandler } from 'react';

interface CustomFormInputProps {
  value: string | number;
  placeholder: string;
  name: string;
  label?: string;
  type?: 'text' | 'number';
  id?: string;
  onChange: ChangeEventHandler;
}

const CustomFormInput: FC<CustomFormInputProps> = ({
  value,
  placeholder,
  name,
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
    />
  </p>
);

export default CustomFormInput;
