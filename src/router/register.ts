import { rootRoute } from '@/router/root';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'register',
  component: lazyRouteComponent(() => import('@/pages/Register'), 'default'),
});
