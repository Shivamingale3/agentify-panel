import routeTree from '@/router/root';
import { createRouter } from '@tanstack/react-router';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({ routeTree });
