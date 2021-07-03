import { FC } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from 'components/SvgIcon';
import { Organization } from 'models/types';

interface OrgListItemProps {
  organization: Organization;
  onDeleteOrganization: (orgId: string) => void;
}

const OrgListItem: FC<OrgListItemProps> = ({ organization, onDeleteOrganization }) => {
  const onDeleteOrg = () => {
    onDeleteOrganization(organization.id);
  };

  return (
    <div className="m-2 sm:m-6 p-2 sm:p-6 flex flex-wrap justify-between items-center rounded sm:rounded-xl shadow bg-green-300">
      <span className="m-1 sm:text-xl font-normal text-gray-400">{organization.name}</span>
      <div className="flex flex-wrap">
        <Link to="../offices" className="action-button flex-grow flex-shrink-0 m-1 bg-blue-500 hover:bg-blue-400">
          <SvgIcon>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </SvgIcon>
        </Link>
        <button
          type="submit"
          onClick={onDeleteOrg}
          className="action-button flex-grow flex-shrink-0 m-1 bg-red-400 hover:bg-red-300"
        >
          <SvgIcon>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </SvgIcon>
        </button>
      </div>
    </div>
  );
};

export default OrgListItem;
