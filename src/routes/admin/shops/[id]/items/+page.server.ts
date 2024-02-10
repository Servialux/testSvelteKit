import { checkLife, getDetails, refreshToken } from "$lib/apiConnect";
import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import {API_URL} from '$env/static/private';

export async function load({ locals, cookies, params }: ServerLoadEvent){

    
    let id: string = "noroute";
    if(params.id){
         id = params.id;
    }
    const endpoint = API_URL+'api/admin/shops/'+id+'/items';
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
    const items = await getDetails(locals.user.token, 'admin/shops/' + id + '/items');
    const itemsForm = await getDetails(locals.user.token, 'admin/shops/' + id + '/items/form');
    const bearer = locals.user.token;

    return {
        props: {
            items: items.data,
            endpoint: endpoint,
            bearer: bearer,
            itemsForm: itemsForm.data
        }
    }
}