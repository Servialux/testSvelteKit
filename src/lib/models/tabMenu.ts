import { writable } from "svelte/store";

interface tab{
    name: string;
    path: string;
    icon: string;
    isActive: boolean;
}

function createTabMenu() {
    const { subscribe, set, update } = writable<tab[]>([
        {name: 'Accueil', path: '/', icon: 'home', isActive: true},
        {name: 'A propos', path: '/about', icon: 'info', isActive: false},
        {name: 'Contact', path: '/contact', icon: 'mail', isActive: false},
    ]);

    return {
        subscribe,
        set,
        update,
        setActive: (path: string) => {
            update(tabs => {
                return tabs.map(tab => {
                    tab.isActive = tab.path === path;
                    return tab;
                });
            });
        }
    };
}
