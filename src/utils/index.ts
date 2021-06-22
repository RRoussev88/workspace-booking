import { NavItem } from 'models/types';

export const navigationItems: Array<NavItem> = [
  { name: 'Sign In', url: '/login', isAuthRequired: false },
  { name: 'Offices', url: '/offices', isAuthRequired: true },
];
