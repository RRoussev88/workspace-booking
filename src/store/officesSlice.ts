import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKey } from 'models/constants';
import { Office } from 'models/office';
import { BaseState, RootState } from 'store';

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
    const response = await fetch(`${OFFICE_URL}/${orgId}`, { method: 'GET', headers: getHeaders() });
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
    dispatch(setErrorState(error.message || 'Error fetching offices list'));
  } finally {
    dispatch(setLoadingState(false));
  }
};
