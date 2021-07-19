import { FC } from 'react';

interface OrganizationCardCardProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const OrganizationCard: FC<OrganizationCardCardProps> = ({ title, disabled, onClick }) => (
  <button type="button" className={`card-button  ${disabled ? 'bg-gray-300' : 'bg-green-300'}`} onClick={onClick}>
    <h4 className={`sm:text-xl font-normal ${disabled ? 'text-white' : 'text-gray-400'}`}>{title}</h4>
  </button>
);

export default OrganizationCard;
