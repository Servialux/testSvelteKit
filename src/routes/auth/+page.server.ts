import { login, register} from '$lib/apiConnect';
import { logUser } from '$lib/stores/userStore';
import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const actions: Actions = {
	login: async ({ request, cookies }) => {

		const data = await request.formData();
		const email = data.get('email');
		const password = data.get('password');

		try{
			if(typeof password !== 'string' || typeof email !== 'string'){return;};
			const result = await login(email, password);
			if(result){
				console.log('cookie', result);
				cookies.set('session', result.token, {
					path: '/',
					httpOnly: true
				});
				cookies.set('sessionRefresh', result.refresh_token, {
					path: '/',
					httpOnly: true
				})
				cookies.set('userMail', email, {
					path:'/', 
					httpOnly: true
				})
			}
		}catch(err){
			console.error(err)
			return fail(400, { message: 'Could not login user.' })
		}	
		throw redirect(302, '/')

	},
	register: async ({ request }) => {
		try{
			const data = await request.formData();
			
			const email = data.get('email');
			const password = data.get('password');
			const repassword = data.get('repassword');
			if(email === null || !password === null || !repassword === null){
				throw new Error('Missing fields');
			}
			if(password === repassword){
				if(typeof password !== 'string' || typeof email !== 'string'){return;};
				const result = await register(email, password);
			}
		}catch (e){
			console.log(e);
		}
	}
};