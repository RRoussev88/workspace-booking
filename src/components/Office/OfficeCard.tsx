import { FC } from 'react';

interface OfficeCardProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const OfficeCard: FC<OfficeCardProps> = ({ title, disabled, onClick }) => (
  <button
    type="button"
    className={`m-2 sm:m-6 p-2 sm:p-6 w-24 sm:w-40 h-24 sm:h-40 break-words flex-grow flex-shrink-0 ${
      disabled ? 'bg-gray-300' : 'bg-yellow-300'
    } rounded sm:rounded-xl shadow`}
    onClick={onClick}
  >
    <h4 className={`sm:text-xl font-normal ${disabled ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
  </button>
);

export default OfficeCard;
