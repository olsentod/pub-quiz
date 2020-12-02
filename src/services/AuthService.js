import store from '../store';
import { http } from './HttpService';
import { showError } from '../services/ErrorService';
import jwt from 'jsonwebtoken';

export function isLoggedIn() {
    const token = decodeToken();
    return token != null;
}

export function isAdmin() {
    const token = decodeToken();
    if (!token) {
        return null;
    }
    return token.user.type == 'admin';
}

export async function login(user) {
    try {
        const res = await http().post('/auth', user);
        setToken(res.data.token);
        return true;
    } catch (error) {
        if (error.response.status == 401) {
            showError({ message: "Incorrect Email/Password Combination" });
        }
        return false;
    }
}

export function logout() {
    localStorage.clear();
    store.dispatch('authenticate');
}


function setToken(token) {
    if (!token) return;
    localStorage.setItem('token', token);
    store.dispatch('authenticate');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function getUserName() {
    const token = decodeToken();
    if (!token) {
        return null;
    }
    return token.user.name;
}

export function getUserId() {
    const token = decodeToken();
    if (!token) {
        return null;
    }
    return token.user.id;
}

export async function registerUser(user) {
    try {
        await http().post('/register', user);
        return true;
    } catch (error) {
        if (error.response.status == 403) {
            showError({ message: "Email already taken" });
        }
        return false;
    }
}

function decodeToken() {
    const token = getToken();
    if (!token) {
        return null;
    }
    return jwt.decode(token);
}