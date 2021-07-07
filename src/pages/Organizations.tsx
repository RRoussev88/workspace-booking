import CreateOrganization from 'components/Organization/CreateOrganization';
import OrganizationsList from 'components/Organization/OrganizationsList';
import { FC } from 'react';

const Organizations: FC = () => (
  <>
    <CreateOrganization />
    <OrganizationsList />
  </>
);

export default Organizations;
