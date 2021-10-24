import { isEmpty } from 'lodash';
import { ChangeEvent, ChangeEventHandler, FC, SyntheticEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { DateTimeInput, DateTimeInputProps } from 'semantic-ui-calendar-react-17';
import { Form } from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';
import { CustomFormInput, SectionHeading } from '..';
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

  const handleTimeChange = (_: SyntheticEvent<HTMLElement>, data: DateTimeInputProps) => {
    setReservationsState((prevState) => ({ ...prevState, [data.name]: new Date(data.value).valueOf() }));
  };

  const handleCancel = () => {
    setReservationsState({});
  };

  const handleCreateReservation = async () => {
    await dispatch(
      createReservation({
        id: uuidv4(),
        officeId: officeId ?? '',
        name:
          reservationState.name ||
          `${auth.coworker?.coworkerName ?? 'user'} booked a workspace from ${new Date(
            reservationState.fromTime ?? '',
          ).toLocaleString()} to ${new Date(reservationState.toTime ?? '').toLocaleString()}.`,
        fromTime: reservationState.fromTime ?? new Date().valueOf(),
        toTime: reservationState.toTime ?? new Date().valueOf(),
        user: auth.coworker?.coworkerEmail ?? '',
      }),
    );
    setReservationsState({});
    if (auth.isLoggedIn && officeId) {
      dispatch(fetchAllOfficeReservations(officeId));
    }
  };

  return (
    <section className="section__layout">
      <SectionHeading text="Create Reservation" />
      <hr className="divider" />
      <Form>
        <fieldset>
          <Form.Field>
            <CustomFormInput
              name="name"
              label="Name"
              placeholder="Enter reservation name"
              value={reservationState.name ?? ''}
              onChange={handleFormChange}
            />
          </Form.Field>
          <Form.Field
            className="mt-2 sm:mt-6"
            label="Start Time"
            required
            control={DateTimeInput}
            closable
            clearable
            id="fromTime"
            name="fromTime"
            hideMobileKeyboard
            iconPosition="left"
            popupPosition="bottom left"
            placeholder="Select Start Time"
            value={reservationState.fromTime ? new Date(reservationState.fromTime).toLocaleString() : ''}
            onChange={handleTimeChange}
            dateTimeFormat={DATE_TIME_FORMAT}
            preserveViewMode={false}
            minDate={
              reservationState.toTime ? new Date(reservationState.toTime - 12 * 60 * 60_000) : new Date()
            }
            maxDate={reservationState.toTime && new Date(reservationState.toTime)}
          />
          <Form.Field
            className="mt-2 sm:mt-6"
            label="End Time"
            required
            control={DateTimeInput}
            closable
            clearable
            id="toTime"
            name="toTime"
            hideMobileKeyboard
            iconPosition="left"
            popupPosition="bottom left"
            placeholder="Select End Time"
            value={reservationState.toTime ? new Date(reservationState.toTime).toLocaleString() : ''}
            onChange={handleTimeChange}
            dateTimeFormat={DATE_TIME_FORMAT}
            preserveViewMode={false}
            minDate={reservationState.fromTime ? new Date(reservationState.fromTime) : new Date()}
            maxDate={reservationState.fromTime && new Date(reservationState.fromTime + 12 * 60 * 60_000)}
          />
        </fieldset>
        <div className="mt-4 -mb-4 flex justify-between">
          <Form.Button content="Cancel" disabled={isEmpty(reservationState)} onClick={handleCancel} />
          <Form.Button
            positive
            disabled={disableSubmit}
            type="submit"
            onClick={handleCreateReservation}
            content="Create"
          />
        </div>
      </Form>
    </section>
  );
};

export default CreateReservation;
