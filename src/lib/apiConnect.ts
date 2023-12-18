import axios from "axios";
import {API_URL} from '$env/static/private';


const endpoint = API_URL

export const login = async (email: string, password: string) => {
    try{
        const response = await axios.post(endpoint + 'api/login', {
            username: email,
            password: password,
        });
        if(response.data){
            return response.data;
        }
        return true;
        
    } catch (error: any){
        console.log(error);
        return false;
    }
}
export type Auth = typeof login


export const register = async (email: string, password: string) => {
    try{
        const response = await axios.post(endpoint + 'register', {
            email: email,
            password: password,
        })
    } catch (error: any){
        console.log(error.response.data);
    }
}

export function checkLife(cookie: string, refresh_toker: string){
    axios.post(endpoint + 'api/checkLife', {
        cookie: cookie,
        refresh_token: refresh_toker,
    })
}