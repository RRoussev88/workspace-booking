import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
} from '@chakra-ui/react';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ChangeEvent, ChangeEventHandler, FC, MouseEvent, useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../authContext';
import { DATE_TIME_FORMAT, FIVE_MINUTES, MOMENT_DATE_TIME_FORMAT, Reservation } from '../../models';
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
      <Box className="p-2 sm:p-6  bg-indigo-300 rounded sm:rounded-xl shadow flex">
        <Heading as="h2" size="lg" className="break-all sm:break-normal font-semibold text-gray-100">
          Create Reservation
        </Heading>
      </Box>
      <Divider className="divider" />
      <form>
        <Stack as="fieldset" spacing={6}>
          <FormControl id="name">
            <FormLabel htmlFor="name">Reservation Name</FormLabel>
            <Input
              id="name"
              name="name"
              label="Reservation Name"
              type="text"
              placeholder="Enter reservation name"
              value={reservationState.name ?? ''}
              onChange={handleFormChange}
            />
          </FormControl>
          <FormControl id="fromTime">
            <FormLabel htmlFor="fromTime">Start Time</FormLabel>
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
          <FormControl id="toTime">
            <FormLabel htmlFor="toTime">End Time</FormLabel>
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
        <Flex className="mt-4" wrap="wrap">
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
