import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { BaseState, RootState } from '.';
import { LocalStorageKey, Reservation } from '../models';
import toaster from '../services/toaster';

export interface ReservationsSliceState extends BaseState<Reservation> {
  currentReservation: Reservation | null;
}

const initialState: ReservationsSliceState = {
  currentReservation: null,
  data: [],
  isLoading: false,
  error: null,
};

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setCurrentReservation(state: ReservationsSliceState, action: PayloadAction<Reservation>) {
      state.currentReservation = action.payload;
    },
    setDataState(state: ReservationsSliceState, action: PayloadAction<Reservation[]>) {
      state.data = action.payload;
      state.error = null;
    },
    setLoadingState(state: ReservationsSliceState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorState(state: ReservationsSliceState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

const { setDataState, setLoadingState, setErrorState } = reservationsSlice.actions;

export const { setCurrentReservation, resetState } = reservationsSlice.actions;

export const selectReservationsState = (state: RootState) => state.reservations;

export default reservationsSlice.reducer;

const RESERVATIONS_URL = 'http://localhost:8000/reservations';

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKey.AUTH) ?? '{}')?.AccessToken}`,
});

export const fetchAllOfficeReservations = (officeId: string) => async (dispatch: Dispatch) => {
  dispatch(setErrorState(null));
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${RESERVATIONS_URL}/office/${officeId}?propName=officeId`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (response.ok) {
      const data: { Items?: Reservation[] } = await response.json();
      if (data.Items) {
        dispatch(
          setDataState(
            data.Items.sort(
              (first, second) => first.fromTime - second.fromTime || first.toTime - second.toTime,
            ),
          ),
        );
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    dispatch(setErrorState((error as Error)?.message || 'Error fetching reservations list'));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const fetchReservation = (reservationId: string) => async (dispatch: Dispatch) => {
  dispatch(setErrorState(null));
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${RESERVATIONS_URL}/${reservationId}`, { method: 'GET', headers: getHeaders() });
    if (response.ok) {
      const data: { Item?: Reservation } = await response.json();
      if (data.Item) {
        dispatch(setCurrentReservation(data.Item));
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    dispatch(setErrorState((error as Error)?.message || 'Error fetching reservation'));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const createReservation = (reservation: Reservation) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(RESERVATIONS_URL, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ reservation }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error creating reservation');
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const updateReservation = (reservation: Reservation) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(RESERVATIONS_URL, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ reservation }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error updating reservation');
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const deleteReservation = (reservationId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${RESERVATIONS_URL}/${reservationId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error deleting reservation');
  } finally {
    dispatch(setLoadingState(false));
  }
};
