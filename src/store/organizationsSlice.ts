import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { LocalStorageKey } from 'models/constants';
import { Organization } from 'models/organization';
import toaster from 'services/toaster';
import { BaseState, RootState } from 'store';

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
    setErrorState(state: OrganizationsSliceState, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetState: () => initialState,
  },
});

const { setActiveOrganization, setDataState, setLoadingState, setErrorState } = organizationsSlice.actions;

export const { resetState } = organizationsSlice.actions;

export const selectOrganizationsState = (state: RootState) => state.organizations;

export default organizationsSlice.reducer;

const ORG_URL = 'http://localhost:8000/organizations';

const getHeaders = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${JSON.parse(localStorage.getItem(LocalStorageKey.AUTH) ?? '{}')?.AccessToken}`,
});

export const fetchAllOrganizations = () => async (dispatch: Dispatch) => {
  dispatch(setErrorState(null));
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(ORG_URL, { method: 'GET', headers: getHeaders() });
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
    dispatch(setErrorState((error as Error)?.message || 'Error fetching organizations list'));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const fetchOrganization = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setErrorState(null));
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(`${ORG_URL}/${orgId}`, {
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
    dispatch(setErrorState((error as Error)?.message || 'Error fetching organization'));
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const createOrganization = (openOrg: Organization) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(ORG_URL, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify({ openOrg }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error creating organization');
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const updateOrganization = (openOrg: Organization) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const response = await fetch(ORG_URL, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ openOrg }),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error updating organization');
  } finally {
    dispatch(setLoadingState(false));
  }
};

export const deleteOrganization = (orgId: string) => async (dispatch: Dispatch) => {
  dispatch(setLoadingState(true));
  try {
    const result = await fetch(`${ORG_URL}/${orgId}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    if (!result.ok) {
      const error = await result.text();
      throw new Error(error);
    }
  } catch (error) {
    toaster.toastError((error as Error)?.message || 'Error deleting organization');
  } finally {
    dispatch(setLoadingState(false));
  }
};
