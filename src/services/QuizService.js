import { http } from './HttpService';

export async function getQuizzes() {
    try {
        const res = await http().get('/quiz');
        return res.data;
    } catch (error) {
        return {};
    }
}