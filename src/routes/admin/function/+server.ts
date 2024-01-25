import { postItem } from '$lib/apiConnect';
import type { RequestHandler } from '@sveltejs/kit';


function isJson(strJson: string|Array<any>|FormDataEntryValue) {
  try {
    if(strJson instanceof Array){
        strJson = JSON.stringify(strJson);
    }
    if(strJson instanceof File){
      return false;
    }
    if(strJson === null){
      return false;
    }
    const parsed = JSON.parse(strJson);
    if (parsed && typeof parsed === "object") {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export const POST: RequestHandler = async (data) => {
    let body: any = {};
    let token = '';
    let sended = new FormData();

    let test: any;

    data.locals.user ? token = data.locals.user.token : '';
    if(token === ''){
      console.log('no token');
    }
    let formData = await data.request.formData();
    
    let logoFile = () => { if(formData.get('logoFile')){return formData.get('logoFile')}else{return ''}};
    let imageFile = () => { if(formData.get('imageFile')){return formData.get('imageFile')}else{return ''}};
    let dataSend = () => { if(formData.get('data')){return formData.get('data')}else{return ''}};
    let dataSendString = dataSend();
    
    body = {
      logoFile: logoFile(),
      imageFile: imageFile(),
      data: dataSend(),
    }

    if(logoFile() instanceof File){
      let file: any = logoFile();
      //let streamFile: any = file.stream();
      sended.append('logoFile', file);
    }

    if(imageFile() instanceof File){
      let file: any = imageFile();
      //let streamFile: any = file.stream();
      if(file instanceof File){
        sended.append('imageFile', file);
      }
      
    }

    if(dataSendString !== null){
      if(isJson(dataSendString)){
        let data: any = dataSend();
        sended.append('data', data);
      }
    }

    try{
    let response = await postItem(token, 'admin/shops/', sended)
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
    } catch (error: any) {
      return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
      });
    }
}