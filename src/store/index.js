import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'
import * as quiz from '../services/QuizService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    apiUrl: 'http://localhost:3000/api',
    name: null,
    userId: null,
    errors: [],
    quizzes: [],
  },
  mutations: {
    authenticate(state){
      state.isLoggedIn = auth.isLoggedIn();
      state.isAdmin = auth.isAdmin();

      if(state.isLoggedIn){
        state.name = auth.getUserName();
        state.userId = auth.getUserId();
      } else {
        state.name = null;
        state.userId = null;
      }
    },
    updateQuizzes(state, quizzes){
      state.quizzes = quizzes;
    },
    addError(state, error){
      state.errors.push(error);
    },
    removeError(state){
      state.errors.shift();
    },
  },
  actions: {
    authenticate(context){
      context.commit('authenticate');
    },
    async getQuizzes(context){
      const quizzes = await quiz.getQuizzes();
      context.commit('updateQuizzes', quizzes);
    },
    async getQuiz(context, id){
      const returnedQuiz = await quiz.getQuiz(id);
      return returnedQuiz;
    },
    async updateQuiz(context, updatedQuiz){
      await quiz.updateQuiz(updatedQuiz);
      context.dispatch('getQuizzes');
    },
    async createQuiz(context, newQuiz){
      await quiz.createQuiz(newQuiz);
      context.dispatch('getQuizzes');
    },
    async deleteQuiz(context, id){
      await quiz.deleteQuiz(id);
      context.dispatch('getQuizzes');
    },
    addError(context, error){
      context.commit('addError', error);
    },
    removeError(context){
      context.commit('removeError');
    }
  },
  modules: {
  }
})
