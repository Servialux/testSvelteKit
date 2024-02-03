import axios from "axios";
import fs from 'fs';
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

export const checkLife = async (cookie: string) => {
    try{
        const res = await axios.get(endpoint + 'api/checklife', {
            headers: {  
                Authorization: `Bearer `+cookie,
            },
        })
        return res;
    }catch(error: any){
        let response = {'code': 0,'message': ''};
        console.log(response)
        if(response.message){
            response.code = error.response.data.statusCode;
            response.message = error.response.data.data.message;
        }
        return response;
    }
}

export function logout(cookie: string, refresh_toker: string){
    axios.post(endpoint + 'api/logout', {
        cookie: cookie,
        refresh_token: refresh_toker,
    })
}

export const refreshToken = async (refresh_token: string) => {
    try{
        const response = await axios.post(endpoint + 'api/token/refresh', {
            refresh_token: refresh_token,
        })
        return response;
    }catch(error: any){
        console.log(error.response.data);
    }
}
// Get API data
export const getDetails = async (cookie: string, route: string) => {
    try{
        const response = await axios.get(endpoint + 'api/'+route, {
            headers: {  
                Authorization: `Bearer `+cookie,
            },
        })
        return response;
    }catch(error: any){
       return error.response.data;
    }
}

// Post API data
export const postItem = async (cookie: string, route: string, data: any) => {
    try{
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+cookie);

        let requestOptions: any = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };

        let response = await fetch(endpoint+route, requestOptions)
        
        return response;
    }
    catch(error: any){
        return error;
    }
}

// Put API data
export const putItem = async (cookie: string, route: string, data: any) => {
    try{
        let myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer "+cookie);
        console.log(route);
        let requestOptions: any = {
            method: 'PUT',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        };
        let response = await fetch(endpoint + 'api'+route, requestOptions)
        
        return response;
    }
    catch(error: any){
        return error;
    }
}
