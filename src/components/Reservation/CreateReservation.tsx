import { Button, Divider, Flex, Spacer, Stack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ChangeEvent, ChangeEventHandler, FC, MouseEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { CustomDatePicker, CustomFormInput, SectionHeading } from '..';
import { AuthContext } from '../../authContext';
import { FIVE_MINUTES, MOMENT_DATE_TIME_FORMAT, Reservation } from '../../models';
import { createReservation, fetchAllOfficeReservations } from '../../store/reservationsSlice';

const CreateReservation: FC = () => {
  const auth = useContext(AuthContext);
  const { officeId } = useParams();
  const dispatch = useDispatch();
  const [reservationState, setReservationsState] = useState<Partial<Reservation>>({});

  const disableSubmit = !reservationState.fromTime || !reservationState.toTime;

  const handleFormChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setReservationsState((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
  };

  const handleFromTimeChange = (date: Date) => {
    setReservationsState((prevState) => ({ ...prevState, fromTime: moment(date).valueOf() }));
  };

  const handleToTimeChange = (date: Date) => {
    setReservationsState((prevState) => ({ ...prevState, toTime: moment(date).valueOf() }));
  };

  const handleCancel = () => {
    setReservationsState({});
  };

  const handleCreateReservation = async (event: MouseEvent) => {
    event.preventDefault();
    await dispatch(
      createReservation({
        id: uuidv4(),
        officeId: officeId ?? '',
        name:
          reservationState.name ||
          `${auth.coworker?.coworkerName ?? 'user'} booked a workspace from ${moment(
            reservationState.fromTime,
          ).format(MOMENT_DATE_TIME_FORMAT)} to ${moment(reservationState.toTime).format(
            MOMENT_DATE_TIME_FORMAT,
          )}.`,
        fromTime: reservationState.fromTime ?? new Date().getTime(),
        toTime: reservationState.toTime ?? new Date().getTime(),
        user: auth.coworker?.coworkerEmail ?? '',
      }),
    );
    setReservationsState({});
    if (auth.isLoggedIn && officeId) {
      dispatch(fetchAllOfficeReservations(officeId));
    }
  };

  const filterStartTime = (time: Date) => {
    const currentTime = new Date();
    const selectedTime = new Date(time);
    if (reservationState.toTime) {
      const maxTime = new Date(reservationState.toTime - FIVE_MINUTES);
      return currentTime.getTime() < selectedTime.getTime() && selectedTime.getTime() < maxTime.getTime();
    }
    return currentTime.getTime() < selectedTime.getTime();
  };

  const filterEndTime = (time: Date) => {
    const currentTime = new Date();
    const selectedTime = new Date(time);
    if (reservationState.fromTime) {
      const minTime = new Date(reservationState.fromTime);
      return currentTime.getTime() < selectedTime.getTime() && minTime.getTime() < selectedTime.getTime();
    }
    return currentTime.getTime() < selectedTime.getTime();
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Reservation" />
      <Divider className="divider" />
      <form>
        <Stack as="fieldset" spacing={6}>
          <CustomFormInput
            id="name"
            name="name"
            label="Reservation Name"
            placeholder="Enter reservation name"
            value={reservationState.name ?? ''}
            onChange={handleFormChange}
          />
          <CustomDatePicker
            id="fromTime"
            name="fromTime"
            label="Start Time"
            placeholderText="Select Start Time"
            filterTime={filterStartTime}
            selected={reservationState.fromTime ? new Date(reservationState.fromTime) : null}
            onChange={handleFromTimeChange}
            minDate={new Date()}
            maxDate={reservationState.toTime ? new Date(reservationState.toTime) : null}
          />
          <CustomDatePicker
            id="toTime"
            name="toTime"
            label="End Time"
            placeholderText="Select End Time"
            filterTime={filterEndTime}
            selected={reservationState.toTime ? new Date(reservationState.toTime) : null}
            onChange={handleToTimeChange}
            minDate={reservationState.fromTime ? new Date(reservationState.fromTime) : new Date()}
          />
        </Stack>
        <Flex className="mt-4" flexWrap="wrap">
          <Button type="button" disabled={isEmpty(reservationState)} onClick={handleCancel}>
            Cancel
          </Button>
          <Spacer />
          <Button
            colorScheme="green"
            disabled={disableSubmit}
            type="submit"
            onClick={handleCreateReservation}
          >
            Create
          </Button>
        </Flex>
      </form>
    </section>
  );
};

export default CreateReservation;
