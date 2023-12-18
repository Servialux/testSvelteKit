import { localStorageStore } from '@skeletonlabs/skeleton';
import { get } from 'svelte/store';
import type { Writable } from 'svelte/store';


export const themeStorage: Writable<string> = localStorageStore('themeSelect', 'skeleton');

export const isMenuShow: Writable<string> = localStorageStore('menuToggle', 'false');

export const pageTitle: Writable<string> = localStorageStore('pageTitle', 'Page inconnue');

export function showMenu() {
    isMenuShow.set('true');
}

export function hideMenu() {
    isMenuShow.set('false');
}
