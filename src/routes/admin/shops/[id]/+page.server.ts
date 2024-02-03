import { checkLife, getDetails, refreshToken } from "$lib/apiConnect";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";

export async function load({ locals, cookies, params }: ServerLoadEvent){

    let id: string = "noroute";
    if(params.id){
         id = params.id;
    }
    
    try{
        let refresh:any;
        if(!locals.user){
            throw redirect(302, '/auth');
        }
        refresh = await refreshToken(locals.user.refresh_token);

        cookies.set('session', refresh.data.token, { path: '/' });
        cookies.set('sessionRefresh', refresh.data.refresh_token, { path: '/' });
        locals.user.token = refresh.data.token;
        locals.user.refresh_token = refresh.data.refresh_token;

        let result = await checkLife(locals.user.token);
    }catch(error: any){
        throw redirect(302, '/auth');
    }
    const shop = await getDetails(locals.user.token, 'admin/shops/' + id);

    return {
        props: {
            shop: shop.data
        }
    }
}