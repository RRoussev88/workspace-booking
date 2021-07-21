import { FC } from 'react';
import CreateOffice from 'components/Office/CreateOffice';
import OfficesList from 'components/Office/OfficesList';

const OrgOffices: FC = () => (
  <>
    <CreateOffice />
    <OfficesList />
  </>
);

export default OrgOffices;
