import type { User } from '@/lib/auth';

/** Context shape available to all routes under the app layout. */
export type AppRouteContext = {
  user: User;
};
