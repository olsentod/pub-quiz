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
    quizzes: []
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
    addQuizzes(state, quizzes){
      state.quizzes = quizzes;
    },
    addError(state, error){
      state.errors.push(error);
    },
    removeError(state){
      state.errors.shift();
    }
  },
  actions: {
    authenticate(context){
      context.commit('authenticate');
    },
    async getQuizzes(context){
      const quizzes = await quiz.getQuizzes();
      context.commit('addQuizzes', quizzes)
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
