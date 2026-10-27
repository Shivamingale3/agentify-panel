import { fetchMe } from '@/lib/auth';
import { rootRoute } from '@/router/root';
import { createRoute, lazyRouteComponent } from '@tanstack/react-router';

export const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'app',
  beforeLoad: async ({ location }) => {
    const user = await fetchMe(location.href);
    return { user };
  },
  component: lazyRouteComponent(() => import('@/pages/AppLayout'), 'default'),
});
