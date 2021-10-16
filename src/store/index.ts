import { configureStore } from '@reduxjs/toolkit';
import offices from './officesSlice';
import organizations from './organizationsSlice';
import reservations from './reservationsSlice';

export const store = configureStore({ reducer: { organizations, offices, reservations } });

export type RootState = ReturnType<typeof store.getState>;

export interface BaseState<T extends object = any> {
  data: T[];
  isLoading: boolean;
  error: string | null;
}
