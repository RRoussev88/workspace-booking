import { AuthContext } from 'authContext';
import AppMessage from 'components/AppMessage';
import ListItem from 'components/ListItem';
import Loader from 'components/Loader';
import SectionHeading from 'components/SectionHeading';
import { Organization } from 'models/organization';
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
    if (auth.isLoggedIn) {
      dispatch(fetchAllOrganizations());
    }

    return () => {
      dispatch(resetState());
    };
  }, [auth.isLoggedIn, dispatch]);

  const handleDelOrg = async (orgId: string) => {
    await dispatch(deleteOrganization(orgId));
    dispatch(fetchAllOrganizations());
  };

  const renderList = () => {
    if (error) {
      return <AppMessage variant={AppMessageVariant.DANGER} text={error} />;
    }
    return organizations.length ? (
      organizations.map((org) => (
        <ListItem<Organization>
          key={org.id}
          isAuthorized={!!auth.coworker?.coworkerEmail && org.contact.includes(auth.coworker?.coworkerEmail)}
          item={org}
          onDelete={handleDelOrg}
        />
      ))
    ) : (
      <AppMessage variant={AppMessageVariant.INFO} text="No Organizations available" />
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
