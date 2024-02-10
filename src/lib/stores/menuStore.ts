import { writable, type Writable } from 'svelte/store';

export const tabSet: Writable<number> = writable(0);
export const tabOpen: Writable<boolean> = writable(false);
export const tabName: Writable<string> = writable('');
export const tabPath: Writable<string> = writable('');

export function setTabSet(value: number) {
    tabSet.set(value);
}

export function setTabOpen(value: boolean) {
    tabOpen.set(value);
}

export function setTabName(value: string) {
    tabName.set(value);
}

export function setTabPath(value: string) {
    tabPath.set(value);
}
