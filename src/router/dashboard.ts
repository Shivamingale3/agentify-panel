import { createRoute, lazyRouteComponent } from '@tanstack/react-router';
import { appRoute } from './app';

// ─── Protected routes (children of appRoute) ────────────────────────

export const dashboardRoute = createRoute({
  getParentRoute: () => appRoute,
  path: '/',
  component: lazyRouteComponent(() => import('@/pages/Dashboard'), 'default'),
});
