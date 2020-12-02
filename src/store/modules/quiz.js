import * as quiz from '../../services/QuizService'

const state = () => ({
    quizzes: []
});

const getters = {}

const actions = {
    async getQuizzes(context) {
        const quizzes = await quiz.getQuizzes();
        context.commit('updateQuizzes', quizzes);
    },
    async getQuiz(context, id) {
        const returnedQuiz = await quiz.getQuiz(id);
        return returnedQuiz;
    },
    async updateQuiz(context, updatedQuiz) {
        await quiz.updateQuiz(updatedQuiz);
        context.dispatch('getQuizzes');
    },
    async createQuiz(context, newQuiz) {
        await quiz.createQuiz(newQuiz);
        context.dispatch('getQuizzes');
    },
    async deleteQuiz(context, id) {
        await quiz.deleteQuiz(id);
        context.dispatch('getQuizzes');
    },
}
const mutations = {
    updateQuizzes(state, quizzes) {
        state.quizzes = quizzes;
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}