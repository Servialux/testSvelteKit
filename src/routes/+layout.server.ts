import type { ServerLoadEvent } from "@sveltejs/kit";

export async function load({ locals }: ServerLoadEvent) {
    let session = { email: '', auth: false };

    if (locals.user && locals.user.isAuthenticated) {
        session = { email: locals.user.email, auth: true };
    }
    return {
        props: {
            session: session,
        }
    };
}