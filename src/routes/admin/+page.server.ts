import { checkLife, getDetails, postItem, refreshToken } from "$lib/apiConnect";
import { redirect } from "@sveltejs/kit";

import type { ServerLoadEvent } from "@sveltejs/kit";

export async function load({ locals, cookies }: ServerLoadEvent) {
    if (!locals.user) {
        throw redirect(302, '/auth');
    }

    let result:any;
    let data: any;
    let sessionInfo: any;
    let dataSend: any;

    result = await checkLife(locals.user.token);
    if(result.statusCode != 202){
        try{
            let refresh:any;
            refresh = await refreshToken(locals.user.refresh_token);

            cookies.set('session', refresh.data.token, { path: '/' });
            cookies.set('sessionRefresh', refresh.data.refresh_token, { path: '/' });
            locals.user.token = refresh.data.token;
            locals.user.refresh_token = refresh.data.refresh_token;

            result = await checkLife(locals.user.token);
            data = await getDetails(locals.user.token, 'admin');
            
        } catch (error: any){

            cookies.set('session', '', { path: '/' });
            cookies.set('sessionRefresh', '', { path: '/' });
            console.log('redirect');

            throw redirect(302, '/auth');
        }
    }
    sessionInfo = result.data;
    dataSend = data.data;

    let formCreate = await getDetails(locals.user.token, 'admin/shops/form');
    let shops = await getDetails(locals.user.token, 'admin/shops/');

    return {
        props: {
            session: sessionInfo,
            data: dataSend,
            formCreate: formCreate.data,
            shops: shops.data,
        }
    };
}
