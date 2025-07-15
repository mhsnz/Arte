import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { users } from '$lib/users';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    console.log('Login attempt:', { username, password }); // دیباگ

    const user = users.find((u) => u.role === 'Admin' && u.username === username && u.password === password);

    if (user) {
      // تنظیم cookie
      cookies.set('auth', 'true', {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 5 * 60 // 5 دقیقه (از کد شما)
      });
      console.log('Cookie set, redirecting to /Admin');
      throw redirect(303, '/Admin');
    } else {
      return fail(401, { error: 'Invalid username or password' });
    }
  }
};