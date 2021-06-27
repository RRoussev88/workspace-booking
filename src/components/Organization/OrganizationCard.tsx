import { FC } from 'react';

interface OrganizationCardCardProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const OrganizationCard: FC<OrganizationCardCardProps> = ({ title, disabled, onClick }) => (
  <div
    className={`m-2 sm:m-6 p-2 sm:p-6 w-24 sm:w-40 h-24 sm:h-40 break-words flex-grow flex-shrink-0 ${
      disabled ? 'bg-gray-300' : 'bg-green-300'
    } rounded sm:rounded-xl shadow`}
    onClick={onClick}
  >
    <h4 className={`sm:text-xl font-normal ${disabled ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
  </div>
);

export default OrganizationCard;
