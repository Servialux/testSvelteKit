
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

const handle_menu:Handle = async ({ event, resolve }) => {
  if(event.locals.user){
    if(event.locals.user.isAuthenticated){
      const path = event.url.pathname;

      const menuItems = [
        { tabName: 'Home', tabPath: '/', tabSet: 0, tabOpen: false, tabIcon: 'material-symbols:home' },
        { tabName: 'Dashboard', tabPath: '/admin', tabSet: 0, tabOpen: false, tabIcon: 'solar:shop-minimalistic-bold' },
        { tabName: 'Logout', tabPath: '/auth/logout', tabSet: 0, tabOpen: false, tabIcon: 'pepicons-pop:dots-x' },
      ];

      if (path.startsWith('/admin/') && path.split('/').length > 2) {
        menuItems.splice(2, 0, {
          tabName: 'Back', 
          tabPath: path+'items',
          tabSet: 0, 
          tabOpen: false, 
          tabIcon: 'gridicons:product'
        });
      }
      event.locals.menuItems = menuItems;
    }
    else {
      const menuItems = [
        { tabName: 'Home', tabPath: '/', tabSet: 0, tabOpen: false, tabIcon: 'material-symbols:home' },
        { tabName: 'Login', tabPath: '/auth', tabSet: 0, tabOpen: false, tabIcon: 'ant-design:login-outlined' },
      ];
      event.locals.menuItems = menuItems;
    }
  }
  return resolve(event);
}


export const handle = sequence(handle_user, handle_auth, handle_menu);