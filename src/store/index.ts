import { configureStore } from '@reduxjs/toolkit';
import offices from './officesSlice';
import organizations from './organizationsSlice';

export const store = configureStore({ reducer: { organizations, offices } });

export type RootState = ReturnType<typeof store.getState>;

export interface BaseState<T = any> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}
