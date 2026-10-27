import type { LoginSearch } from '@/pages/login/types';
import { rootRoute } from '@/router/root';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'login',
  validateSearch: (search: Record<string, unknown>): LoginSearch => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: lazyRouteComponent(() => import('@/pages/login/Login'), 'default'),
});
