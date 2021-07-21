export type NavItem = { name: string; url: string; isAuthRequired: boolean };

export type Coworker = { id: string; email: string; name?: string; avatar?: string };

export enum AppMessageVariant {
  INFO = 'blue',
  WARNING = 'yellow',
  DANGER = 'red',
}
