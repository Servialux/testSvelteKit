import type { ServerLoadEvent } from "@sveltejs/kit";
import type { AsyncLocalStorage } from "async_hooks";
import type { LocaleObject } from "yup";

export async function load({ locals }: ServerLoadEvent) {
    let session = { email: '', auth: false };
    let menuItems;
    if (locals.user && locals.user.isAuthenticated) {
        session = { email: locals.user.email, auth: true };
    }
    if (locals.menuItems) {
        menuItems = locals.menuItems;
    }
    return {
        props: {
            session: session,
            menuItems: menuItems
        }
    };
}