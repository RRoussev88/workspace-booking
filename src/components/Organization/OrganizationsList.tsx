import { Box, Spinner } from '@chakra-ui/react';
import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppMessage, ConfirmDialog, ListItem, SectionHeading } from '..';
import { AuthContext } from '../../authContext';
import { AppMessageVariant, Organization } from '../../models';
import {
  deleteOrganization,
  fetchAllOrganizations,
  resetState,
  selectOrganizationsState,
} from '../../store/organizationsSlice';

const OrganizationsList: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: organizations, error, isLoading } = useSelector(selectOrganizationsState);
  const [deleteOrgId, setDeleteOrgId] = useState<string | null>(null);

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
    setDeleteOrgId(null);
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
          onDelete={setDeleteOrgId}
        />
      ))
    ) : (
      <AppMessage variant={AppMessageVariant.INFO} text="No Organizations available" />
    );
  };

  return (
    <section className="section__layout">
      <ConfirmDialog
        isOpen={!!deleteOrgId}
        title="Confirm Deletion"
        text="Are you sure deleting that organization?"
        onCancel={() => setDeleteOrgId(null)}
        onConfirm={() => deleteOrgId && handleDelOrg(deleteOrgId)}
      />
      <SectionHeading text="Organizations List" />
      <hr className="divider" />
      <div className="flex flex-col justify-center overflow-hidden">
        {isLoading ? (
          <Box w="100%" textAlign="center">
            <Spinner />
          </Box>
        ) : (
          renderList()
        )}
      </div>
    </section>
  );
};

export default OrganizationsList;
