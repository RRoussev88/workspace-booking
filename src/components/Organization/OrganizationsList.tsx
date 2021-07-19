import { AuthContext } from 'authContext';
import AppMessage from 'components/AppMessage';
import Loader from 'components/Loader';
import OrgListItem from 'components/Organization/OrgListItem';
import SectionHeading from 'components/SectionHeading';
import { AppMessageVariant } from 'models/types';
import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteOrganization,
  fetchAllOrganizations,
  resetState,
  selectOrganizationsState,
} from 'store/organizationsSlice';

const OrganizationsList: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: organizations, error, isLoading } = useSelector(selectOrganizationsState);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      dispatch(fetchAllOrganizations());
    }

    return () => {
      dispatch(resetState());
    };
  }, [auth.isLoggedIn, dispatch, resetState, fetchAllOrganizations]);

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
      <hr className="divider" />
      <div className="flex flex-col justify-center overflow-hidden">{isLoading ? <Loader /> : renderList()}</div>
    </section>
  );
};

export default OrganizationsList;
