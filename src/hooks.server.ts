
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

const handle_user:Handle = async ({ event, resolve }) => {
    const session = event.cookies.get('session') ?? '';
    const sessionRefresh = event.cookies.get('sessionRefresh') ?? '';
    const userMail = event.cookies.get('userMail') ?? '';
    
    event.locals.user = {
      isAuthenticated: !!session,
      token: session,
      refresh_token: sessionRefresh,
      email: userMail
    };
    return resolve(event);
};

const handle_auth:Handle = async ({ event, resolve }) => {
  if (event.url.pathname.startsWith('/admin')) {
    console.log('admin');
  }

  return resolve(event);
};

export const handle = sequence(handle_user, handle_auth);