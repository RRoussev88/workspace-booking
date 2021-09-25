import { CreateOrganization, OrganizationsList } from 'components/Organization';
import { FC } from 'react';

const Organizations: FC = () => (
  <>
    <CreateOrganization />
    <OrganizationsList />
  </>
);

export default Organizations;
