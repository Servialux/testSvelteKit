import { writable, type Writable } from 'svelte/store';
import { localStorageStore } from '@skeletonlabs/skeleton';

export interface User {
    isAuthenticated: boolean
    token: string
    refresh_token: string
    email: string
};

const initUser = {
    isAuthenticated: false, 
    token: '',
    refresh_token: '',
    email: '',
};

export let userInfo = writable<User>(initUser);

export function getUserStore(){
    let getUser = {};
    userInfo.subscribe((u) => getUser = u);
    return {
        getUser,
    }
}

export const logUser = (token: string, refresh: string, email: string) => {
    try{
        const newUserInfo: User = {
            isAuthenticated: true,
            token: token,
            refresh_token: refresh,
            email: email,
        };
        userInfo.set(newUserInfo);
        return { 'success': true };
    } catch(e){
        console.log('LogUserERROR:', e);
        return { 'success': false };
    }
};

export const userAuth: Writable<string> = localStorageStore('userauth', 'false');

export function logoutUserAuth(){
    userAuth.set('false');
}

export function loginUserAuth(){
    userAuth.set('true');
}