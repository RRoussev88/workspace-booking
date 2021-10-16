import { FC, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppMessage, ConfirmDialog, ListItem, Loader, SectionHeading } from '..';
import { AuthContext } from '../../authContext';
import { AppMessageVariant, Reservation } from '../../models';
import {
  deleteReservation,
  fetchAllOfficeReservations,
  resetState,
  selectReservationsState,
} from '../../store/reservationsSlice';

const ReservationsList: FC = () => {
  const { officeId } = useParams();
  const auth = useContext(AuthContext);
  const dispatch = useDispatch();
  const { data: reservations, error, isLoading } = useSelector(selectReservationsState);
  const [deleteReservId, setDeleteReservId] = useState<string | null>(null);

  useEffect(() => {
    if (auth.isLoggedIn && officeId) {
      dispatch(fetchAllOfficeReservations(officeId));
    }

    return () => {
      dispatch(resetState());
    };
  }, [auth.isLoggedIn, dispatch, officeId]);

  const handleDelReservation = async (reservationId: string) => {
    await dispatch(deleteReservation(reservationId));
    setDeleteReservId(null);
    officeId && dispatch(fetchAllOfficeReservations(officeId));
  };

  const renderList = () => {
    if (error) {
      return <AppMessage variant={AppMessageVariant.DANGER} text={error} />;
    }
    return reservations.length ? (
      reservations.map((reservation) => (
        <ListItem<Reservation>
          key={reservation.id}
          isAuthorized={!!auth.coworker?.coworkerEmail && reservation.user === auth.coworker?.coworkerEmail}
          item={reservation}
          onDelete={setDeleteReservId}
        />
      ))
    ) : (
      <AppMessage variant={AppMessageVariant.INFO} text="No Reservations available" />
    );
  };

  return (
    <section className="section__layout">
      <ConfirmDialog
        isOpen={!!deleteReservId}
        title="Confirm Canceling"
        text="Are you sure canceling that reservation?"
        onCancel={() => setDeleteReservId(null)}
        onConfirm={() => deleteReservId && handleDelReservation(deleteReservId)}
      />
      <SectionHeading text="Reservations List" />
      <hr className="divider" />
      <div className="flex flex-col justify-center overflow-hidden">
        {isLoading ? <Loader /> : renderList()}
      </div>
    </section>
  );
};

export default ReservationsList;
