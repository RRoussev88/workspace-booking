import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { CreateOffice } from '../components/Office';
import { ReservationsList } from '../components/Reservation';
import { fetchOrganization, resetState, selectOrganizationsState } from '../store/organizationsSlice';

const OfficeReservations: FC = () => {
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
      {!!auth.coworker?.coworkerEmail &&
        activeOrganization?.participants.includes(auth.coworker?.coworkerEmail) && <CreateOffice />}
      <ReservationsList />
    </>
  );
};

export default OfficeReservations;
