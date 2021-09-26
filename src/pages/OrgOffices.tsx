import { FC } from 'react';
import { CreateOffice, OfficesList } from '../components/Office';

const OrgOffices: FC = () => (
  <>
    <CreateOffice />
    <OfficesList />
  </>
);

export default OrgOffices;
