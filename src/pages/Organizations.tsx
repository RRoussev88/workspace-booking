import { FC } from 'react';
import { CreateOrganization, OrganizationsList } from '../components/Organization';

const Organizations: FC = () => (
  <>
    <CreateOrganization />
    <OrganizationsList />
  </>
);

export default Organizations;
