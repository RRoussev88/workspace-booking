import { FC } from 'react';

interface OfficeCardProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const OfficeCard: FC<OfficeCardProps> = ({ title, disabled, onClick }) => (
  <div className={`m-6 p-6 w-40 h-40 ${disabled ? 'bg-gray-300' : 'bg-red-300'} rounded-xl shadow`} onClick={onClick}>
    <h4 className={`text-xl font-normal ${disabled ? 'text-white' : 'text-gray-100'}`}>{title}</h4>
  </div>
);

export default OfficeCard;
