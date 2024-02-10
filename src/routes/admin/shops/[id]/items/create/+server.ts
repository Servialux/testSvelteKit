import { putItem, postItem } from "$lib/apiConnect";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ locals, params, request }) => {
    if(request){
        let token = locals.user ? (locals.user.token != null ? locals.user.token : '') : '';
        
        const data = await request.formData();
        console.log('form',data);
 
        let response = await postItem(token, 'api/admin/shops/'+params.id+'/items/', data);
        console.log(response);
        if (response.ok) { // Si le statut est 200-299
            let responseBody = await response.json(); 
            return new Response(JSON.stringify(responseBody), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            let errorBody = await response.text(); 
            return new Response(errorBody, {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    }
    return new Response(JSON.stringify({ error: 'test' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
}

export const PUT: RequestHandler = async ({ locals, params, request }) => {
    let token = locals.user ? (locals.user.token != null ? locals.user.token : '') : '';

    let errorBody = 'not found';
    return new Response(errorBody, {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
    });
};