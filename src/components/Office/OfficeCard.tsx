import { FC } from 'react';

interface OfficeCardProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const OfficeCard: FC<OfficeCardProps> = ({ title, disabled, onClick }) => (
  <button
    type="button"
    className={`card-button ${disabled ? 'bg-gray-300 cursor-default' : 'bg-yellow-300 hover:shadow-lg'}`}
    onClick={onClick}
  >
    <h4 className={`sm:text-xl font-normal ${disabled ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
  </button>
);

export default OfficeCard;
