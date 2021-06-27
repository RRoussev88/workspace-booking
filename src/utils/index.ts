import { NavItem } from 'models/types';

export const navigationItems: Array<NavItem> = [
  { name: 'Sign In', url: '/login', isAuthRequired: false },
  { name: 'Organizations', url: '/organizations', isAuthRequired: true },
  { name: 'Offices', url: '/offices', isAuthRequired: true },
];
