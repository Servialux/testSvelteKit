import { postItem, refreshToken } from '$lib/apiConnect';
import type { RequestHandler } from '@sveltejs/kit';
import { request } from 'http';

export const POST: RequestHandler = async (data) => {
    let body: any = {};
    let token = '';
    data.locals.user ? token = data.locals.user.token : '';
    if(token === ''){
      console.log('no token');
    }
    let formData = await data.request.formData();
    
    let logoFile = () => { if(formData.get('logoFile')){return formData.get('logoFile')}else{return ''}};
    let imageFile = () => { if(formData.get('imageFile')){return formData.get('imageFile')}else{return ''}};
    let dataSend = () => { if(formData.get('data')){return formData.get('data')}else{return ''}};

    body = {
      logoFile: logoFile(),
      imageFile: imageFile(),
      data: dataSend(),
    }
    let response = await postItem(token, 'admin/shops/', body);
    console.log(response);
    return new Response("OK");
   


};

// export const POST: RequestHandler = async (data) => {
//   let token = data.locals.user ? data.locals.user.token : '';
//   // Si besoin de rafraîchir le token, ajoutez votre logique ici

//   const formData = await request.formData();
//   const files = {};
//   const data = {};

//   // Traiter les fichiers et les données
//   for (const [key, value] of formData.entries()) {
//       if (value instanceof File) {
//           files[key] = value;
//       } else {
//           data[key] = value;
//       }
//   }

// }

// export const POST: RequestHandler = (data) => {
// 	// affiche tous les headers
// 	const body = data.request;

// 	// affiche tous les champs
// 	console.log(body);
// 	// crée une Response JSON en utilisant un header reçu
// 	return json(
// 		{
// 			// récupère un header spécifique
// 			userAgent: request.headers.get('user-agent'),
// 		},
// 		{
// 			// définit un header sur la réponse
// 			headers: { 'x-custom-header': 'potato' },
// 		},
// 	);
// };
// /** @type {import('./types').RequestHandler} */
// export async function POST({request: Request}): Promise<Response> {
//   const cnt = await request.json();
//   console.info('POST:' ,cnt);
//   // const formData = await request.formData();
//   // console.log(formData);
//   // // Pour récupérer des fichiers
//   // const logoFile = formData.get('logoFile');
//   // const imageFile = formData.get('imageFile');
//   return new Response(JSON.stringify({ success: true, message: "Données reçues avec succès" }), {
//     headers: { 'Content-Type': 'application/json' }
// });
//   // console.log(logoFile, imageFile);
//   // Pour récupérer d'autres données

  
//   // Traiter les fichiers et les données comme nécessaire
//   // Sauvegarder les fichiers, insérer les données dans une base de données, etc.

//   // if (formData) {
//       return new Response(JSON.stringify({ success: true, message: "Données reçues avec succès" }), {
//           headers: { 'Content-Type': 'application/json' }
//       });
//   // } else {
//   //     // Gérer les erreurs si nécessaire
//   //     throw error(400, 'Données invalides');
//   // }
// }