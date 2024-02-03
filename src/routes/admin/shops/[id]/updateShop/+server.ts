import { putItem, postItem } from "$lib/apiConnect";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async (data) => {
    if(data){
        let token = data.locals.user ? (data.locals.user.token != null ? data.locals.user.token : '') : '';
        
        let response = await postItem(token, 'api/admin/shops/'+data.params.id, data.params);
        console.log(response);
        if (response.ok) { // Si le statut est 200-299
            let responseBody = await response.json(); 
            return new Response(JSON.stringify(responseBody), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            // Gestion des réponses d'erreur
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

    const requestBody = await request.json();
    console.log('before',requestBody);
    let response = await putItem(token, '/admin/shops/' + params.id, JSON.stringify(requestBody));
    if (response.ok) {
        let responseBody = await response.json();
        console.log('after',responseBody);
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
};