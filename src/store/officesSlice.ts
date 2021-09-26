import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { BaseState, RootState } from '.';
import { LocalStorageKey, Office } from '../models';
import toaster from '../services/toaster';

export interface OfficesSliceState extends BaseState<Office> {
  activeOffice: Office | null;
}

const initialState: OfficesSliceState = {
  activeOffice: null,
  data: [],
  isLoading: false,
  error: null,
};

export const counterSlice = createSlice({
  name: 'offices',
  initialState,
  reducers: {
    setActiveOffice(state: OfficesSliceState, action: PayloadAction<Office>) {
      state.activeOffice = action.payload;
    },
    setDataState(state: OfficesSliceState, action: PayloadAction<Office[]>) {
      state.data = action.payload;
      state.error = null;
    },
    setLoadingState(state: OfficesSliceState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorState(state: OfficesSliceState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setActiveOffice, setDataState, setLoadingState, setErrorState, resetState } = counterSlice.actions;

export const selectOfficesState = (state: RootState) => state.offices;

export default counterSlice.reducer;

const OFFICE_URL = 'http://localhost:8000/offices';

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKey.AUTH) ?? '{}')?.AccessToken}`,
});

export const fetchAllOrgOffices = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setErrorState(null));
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${OFFICE_URL}/org/${orgId}?paramName=organizationId`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (response.ok) {
      const data: { Items?: Office[] } = await response.json();
      if (data.Items) {
        dispatch(setDataState(data.Items.sort((first, second) => first.name.localeCompare(second.name))));
      }
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    dispatch(setErrorState((error as Error)?.message || 'Error fetching offices list'));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const createOffice = (simpleOffice: Office) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(OFFICE_URL, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ simpleOffice }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error creating office');
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const deleteOffice = (officeId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${OFFICE_URL}/${officeId}`, { method: 'DELETE', headers: getHeaders() });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error deleting office');
  } finally {
    dispatch(setLoadingState(false));
  }
};
