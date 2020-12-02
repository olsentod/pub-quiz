import { http } from './HttpService';

export async function getQuizzes() {
    try {
        const res = await http().get('/quiz');
        return res.data;
    } catch (error) {
        return {};
    }
}

export async function getQuiz(id) {
    try {
        const res = await http().get(`/quiz/${id}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export async function createQuiz(quiz){
    try {
        quiz.questions = quiz.questions.map(({_id, ...keep}) => _id ? keep : keep); // Filter out temp _id for questions
        await http().post('/quiz', quiz);
    } catch (error) {
        console.error(error);
    }
}

export async function updateQuiz(quiz){
    try {
        quiz.questions = quiz.questions.map(({_id, ...keep}) => _id ? keep : keep); // Filter out temp _id for questions
        await http().put(`/quiz/${quiz._id}`, quiz);
    } catch (error) {
        console.error(error);
    }
}

export async function deleteQuiz(id){
    try {
        // quiz.questions = quiz.questions.map(({_id, ...keep}) => _id ? keep : keep); // Filter out temp _id for questions
        await http().delete(`/quiz/${id}`);
    } catch (error) {
        console.error(error);
    }
}