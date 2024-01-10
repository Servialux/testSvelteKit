import { postItem, refreshToken } from '$lib/apiConnect';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (data) => {
    let body: any = {};
    let token = '';
    if(data.locals.user){
        console.log('user connected')
        token = data.locals.user.token;
    }else{
      
    }
    body = await data.request.json();
    console.log(body.imageFile);
    console.log(body);
    let response = await postItem(token, 'admin/shops/', body);
    console.log(response);
    return new Response("OK");
};