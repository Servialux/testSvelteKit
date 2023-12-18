import type { ServerLoadEvent } from "@sveltejs/kit";
import fs from 'fs';
import path from 'path';

export const load = async ({ locals }: ServerLoadEvent) => {
    let session = { email: '', auth: false };
    let fileArray:Array<any> = [];

    if (locals.user && locals.user.isAuthenticated) {
        session = { email: locals.user.email, auth: true };
    }

    fs.readdirSync(path.join('static/images/caroussel')).forEach((file) => {
        fileArray.push(`/images/caroussel/${file}`);
    });
    console.log('sessiontest', fileArray);
    return {
        props: {
            session: session,
            images: fileArray
        }
    };


};