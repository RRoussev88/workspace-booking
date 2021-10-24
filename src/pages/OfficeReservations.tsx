import { FC, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { CreateReservation, ReservationsList } from '../components/Reservation';
import { fetchOrganization, resetState, selectOrganizationsState } from '../store/organizationsSlice';
import { OrgType } from '../models';

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
      {((!!auth.coworker?.coworkerEmail &&
        activeOrganization?.participants.includes(auth.coworker?.coworkerEmail)) ||
        activeOrganization?.type === OrgType.OPEN) && <CreateReservation />}
      <ReservationsList />
    </>
  );
};

export default OfficeReservations;
