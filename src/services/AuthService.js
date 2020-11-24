import store from '../store';
import { http } from './HttpService';
import jwt from 'jsonwebtoken';

export function isLoggedIn() {
    const token = localStorage.getItem('token');
    return token != null;
}

export async function login(user) {
    const res = await http().post('/auth', user);
    if(res){
        setToken(res.data.token);
    }
    return res;
}

export function logout(){
    localStorage.clear();
    store.dispatch('authenticate');
}


function setToken(token) {
    localStorage.setItem('token', token);
    store.dispatch('authenticate');
}

export function getToken(){
    return localStorage.getItem('token');
}

export function getUserName() {
    const token = decodeToken();
    if(!token){
        return null;
    }
    console.log(token);
    return token.user.name;
}

export function getUserId() {
    const token = decodeToken();
    if(!token){
        return null;
    }
    return token.user.id;
}

export function registerUser(user){
    return http().post('/register', user);
}

function decodeToken(){
    const token = getToken();
    if(!token){
        return null;
    }
    return jwt.decode(token);
}