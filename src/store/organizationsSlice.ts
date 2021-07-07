import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from 'models/organization';
import { BaseState, RootState } from 'store';
import { LocalStorageKey } from 'models/constants';

export interface OrganizationsSliceState extends BaseState<Organization> {
  activeOrganization: Organization | null;
}

const initialState: OrganizationsSliceState = {
  activeOrganization: null,
  data: [],
  isLoading: false,
  error: null,
};

export const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setActiveOrganization(state: OrganizationsSliceState, action: PayloadAction<Organization>) {
      state.activeOrganization = action.payload;
    },
    setDataState(state: OrganizationsSliceState, action: PayloadAction<Organization[]>) {
      state.data = action.payload;
      state.error = null;
    },
    setLoadingState(state: OrganizationsSliceState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorState(state: OrganizationsSliceState, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

const { setActiveOrganization, setDataState, setLoadingState, setErrorState } = organizationsSlice.actions;

export const { resetState } = organizationsSlice.actions;

export const selectOrganizationsState = (state: RootState) => state.organizations;

export default organizationsSlice.reducer;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKey.AUTH) ?? '')?.AccessToken}`,
};

export const fetchAllOrganizations = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch('http://localhost:8000/organizations', { method: 'GET', headers });
    if (response.ok) {
      const data: { Items?: Organization[] } = await response.json();
      if (data.Items) {
        dispatch(setDataState(data.Items.sort((first, second) => first.name.localeCompare(second.name))));
      }
    } else {
      throw new Error(response.statusText ?? 'Error fetching organizations');
    }
  } catch (error) {
    dispatch(setErrorState(error.message));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const fetchOrganization = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const data: { Item: Organization } = await (
      await fetch(`http://localhost:8000/organizations/${orgId}`, { method: 'GET', headers })
    ).json();
    dispatch(setActiveOrganization(data.Item));
  } catch (error) {
    dispatch(setErrorState(error.message));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const createOrganization = (newOrganization: Organization) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    await fetch('http://localhost:8000/organizations/', {
      method: 'PUT',
      headers,
      body: JSON.stringify({ newOrganization }),
    });
  } catch (error) {
    // TODO: Replace with toast
    dispatch(setErrorState(error.message));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const deleteOrganization = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    await fetch(`http://localhost:8000/organizations/${orgId}`, { method: 'DELETE', headers });
    fetchAllOrganizations()(dispatch);
  } catch (error) {
    // TODO: Replace with toast
    dispatch(setErrorState(error.message));
    dispatch(setLoadingState(false));
  }
};
