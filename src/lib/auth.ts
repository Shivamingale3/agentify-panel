import { redirect } from '@tanstack/react-router';

export type User = {
  id: string;
  email: string;
  name: string;
};

/**
 * Calls /me to verify the session. Throws a redirect to /login on failure.
 * Returns the authenticated user on success.
 */
export async function fetchMe(locationHref: string): Promise<User> {
  const res = await fetch('/api/v1/me', { credentials: 'include' });

  if (!res.ok) {
    throw redirect({
      to: '/login',
      search: { redirect: locationHref },
    });
  }

  return res.json() as Promise<User>;
}
