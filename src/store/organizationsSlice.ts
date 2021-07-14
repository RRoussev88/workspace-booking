import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { Organization } from 'models/organization';
import { BaseState, RootState } from 'store';
import { LocalStorageKey } from 'models/constants';
import toaster from 'services/toaster';

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

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKey.AUTH) ?? '{}')?.AccessToken}`,
});

export const fetchAllOrganizations = () => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch('http://localhost:8000/organizations', { method: 'GET', headers: getHeaders() });
    if (response.ok) {
      const data: { Items?: Organization[] } = await response.json();
      if (data.Items) {
        dispatch(setDataState(data.Items.sort((first, second) => first.name.localeCompare(second.name))));
      }
    } else {
      const error = await response.text();
      throw new Error(error);
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
    const response = await fetch(`http://localhost:8000/organizations/${orgId}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    if (response.ok) {
      const data: { Item: Organization } = await response.json();
      dispatch(setActiveOrganization(data.Item));
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    dispatch(setErrorState(error.message));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const createOrganization = (openOrg: Organization) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch('http://localhost:8000/organizations/', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ openOrg }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError(error);
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const deleteOrganization = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const result = await fetch(`http://localhost:8000/organizations/${orgId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!result.ok) {
      const error = await result.text();
      throw new Error(error);
    }
    fetchAllOrganizations()(dispatch);
  } catch (error) {
    toaster.toastError(error);
    dispatch(setLoadingState(false));
  }
};
