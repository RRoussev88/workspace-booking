import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setErrorState(state: OfficesSliceState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

export const { setActiveOffice, setDataState, setLoadingState, setErrorState, resetState } = counterSlice.actions;

export const selectOfficesState = (state: RootState) => state.offices;

export default counterSlice.reducer;
