import RootLayout from '@/pages/RootLayout';
import { appRoute } from '@/router/app';
import { dashboardRoute } from '@/router/dashboard';
import { loginRoute } from '@/router/login';
import { registerRoute } from '@/router/register';
import { createRootRoute } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: RootLayout,
});

const routeTree = rootRoute.addChildren([
  appRoute.addChildren([dashboardRoute]),
  loginRoute,
  registerRoute,
]);

export default routeTree;
