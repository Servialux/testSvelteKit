import { putItem } from "$lib/apiConnect";
import type { RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async (data) => {
    if(data){
        let token = data.locals.user ? (data.locals.user.token != null ? data.locals.user.token : '') : '';
        let response = await putItem(token, 'admin/shops/'+data.params.id, data.params);

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