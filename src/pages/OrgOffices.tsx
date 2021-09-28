import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { CreateOffice, OfficesList } from '../components/Office';
import { fetchOrganization, resetState, selectOrganizationsState } from '../store/organizationsSlice';

const OrgOffices: FC = () => {
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { orgId } = useParams();
  const { activeOrganization } = useSelector(selectOrganizationsState);

  useEffect(() => {
    if (orgId) {
      dispatch(fetchOrganization(orgId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [dispatch, orgId]);

  return (
    <>
      {!!auth.coworker?.coworkerEmail && activeOrganization?.contact.includes(auth.coworker?.coworkerEmail) && (
        <CreateOffice />
      )}
      <OfficesList />
    </>
  );
};

export default OrgOffices;
