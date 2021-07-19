import { FC, ChangeEventHandler } from 'react';

interface CustomTextAreaProps {
  value: string | number;
  name: string;
  containerClasses?: string;
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
  containerClasses,
  placeholder,
  disabled,
  label,
  rows,
  id,
  onChange,
}) => (
  <p className={containerClasses}>
    <label className="text-lg" htmlFor={id ?? name}>{label ?? name}</label>
    <textarea
      className="block my-1 p-3 w-full rounded-2xl shadow focus:outline-none focus:ring"
      name={name}
      id={id ?? name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      rows={rows ?? 3}
    />
  </p>
);

export default CustomFormInput;