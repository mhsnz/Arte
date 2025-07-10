import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, cookies }) => {
  console.log('Current URL:', url.pathname);
  console.log('Auth cookie:', cookies.get('auth'));

  const isAuthenticated = cookies.get('auth') === 'true';

  if (!isAuthenticated && url.pathname !== '/Admin/Login') {
    console.log('Redirecting to /Admin/Login');
    throw redirect(303, '/Admin/Login');
  }

  return {};
};