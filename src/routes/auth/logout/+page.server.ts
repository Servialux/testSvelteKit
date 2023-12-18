
export function load({ cookies }) {
    let toastMessage: any = false;
    try{
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0)
        });
        toastMessage = 'Vous êtes déconnecté avec succès !';
    }catch(e){
        console.log(e);
        toastMessage = e;
    }

    return {
        props: {
            toastMessage: toastMessage,
        }
    }
}