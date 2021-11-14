import { Button, FormControl, FormLabel, Flex, Input, Spacer, Stack } from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ChangeEvent, ChangeEventHandler, FC, MouseEvent, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { SectionHeading } from '..';
import { AuthContext } from '../../authContext';
import { DATE_TIME_FORMAT, Reservation } from '../../models';
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
          ).toLocaleString()} to ${moment(reservationState.toTime).toLocaleString()}.`,
        fromTime: reservationState.fromTime ?? moment().valueOf(),
        toTime: reservationState.toTime ?? moment().valueOf(),
        user: auth.coworker?.coworkerEmail ?? '',
      }),
    );
    setReservationsState({});
    if (auth.isLoggedIn && officeId) {
      dispatch(fetchAllOfficeReservations(officeId));
    }
  };

  const filterStartTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    if (reservationState.toTime) {
      const maxTime = new Date(reservationState.toTime);
      return currentDate.getTime() < selectedDate.getTime() && selectedDate.getTime() < maxTime.getTime();
    }
    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterEndTime = (time: Date) => {
    const selectedDate = new Date(time);
    if (reservationState.fromTime) {
      const minTime = new Date(reservationState.fromTime + 300_000);
      return minTime.getTime() < selectedDate.getTime();
    }
    const currentDate = new Date();
    return currentDate.getTime() < selectedDate.getTime();
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Reservation" />
      <hr className="divider" />
      <form>
        <fieldset>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Reservation Name</FormLabel>
              <Input
                name="name"
                label="Reservation Name"
                type="text"
                placeholder="Enter reservation name"
                value={reservationState.name ?? ''}
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Start Time</FormLabel>
              <DatePicker
                id="fromTime"
                name="fromTime"
                autoComplete="off"
                placeholderText="Select Start Time"
                showTimeSelect
                showWeekNumbers
                showMonthDropdown
                timeIntervals={5}
                dateFormat={DATE_TIME_FORMAT}
                filterTime={filterStartTime}
                selected={reservationState.fromTime ? new Date(reservationState.fromTime) : null}
                onChange={handleFromTimeChange}
                minDate={new Date()}
                maxDate={reservationState.toTime ? new Date(reservationState.toTime) : null}
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>End Time</FormLabel>
              <DatePicker
                id="toTime"
                name="toTime"
                autoComplete="off"
                placeholderText="Select End Time"
                showTimeSelect
                showWeekNumbers
                showMonthDropdown
                timeIntervals={5}
                dateFormat={DATE_TIME_FORMAT}
                filterTime={filterEndTime}
                selected={reservationState.toTime ? new Date(reservationState.toTime) : null}
                onChange={handleToTimeChange}
                minDate={reservationState.fromTime ? new Date(reservationState.fromTime) : new Date()}
              />
            </FormControl>
          </Stack>
        </fieldset>
        <Flex className="mt-4">
          <Button type="button" disabled={isEmpty(reservationState)} onClick={handleCancel}>
            Cancel
          </Button>
          <Spacer />
          <Button colorScheme="blue" disabled={disableSubmit} type="submit" onClick={handleCreateReservation}>
            Create
          </Button>
        </Flex>
      </form>
    </section>
  );
};

export default CreateReservation;
