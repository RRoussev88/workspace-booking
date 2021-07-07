import AppMessage from 'components/AppMessage';
import OrgListItem from 'components/Organization/OrgListItem';
import SectionHeading from 'components/SectionHeading';
import { AppMessageVariant } from 'models/types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrganization, fetchAllOrganizations, selectOrganizationsState } from 'store/organizationsSlice';

const OrganizationsList: FC = () => {
  const dispatch = useDispatch();
  const { data: organizations, error } = useSelector(selectOrganizationsState);

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = () => {
    dispatch(fetchAllOrganizations());
  };

  const handleDelOrg = (orgId: string) => {
    dispatch(deleteOrganization(orgId));
  };

  const renderList = () => {
    if (error) {
      return <AppMessage variant={AppMessageVariant.DANGER} text={error} />;
    }
    return organizations.length ? (
      organizations.map((org) => <OrgListItem key={org.id} organization={org} onDeleteOrganization={handleDelOrg} />)
    ) : (
      <AppMessage variant={AppMessageVariant.WARNING} text="No Organizations available" />
    );
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Organizations List" />
      <hr />
      <div className="flex flex-col justify-center">{renderList()}</div>
    </section>
  );
};

export default OrganizationsList;
