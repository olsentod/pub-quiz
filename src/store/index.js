import Vue from 'vue'
import Vuex from 'vuex'
import quiz from './modules/quiz'
import error from './modules/error'
import * as auth from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    apiUrl: 'http://localhost:3000/api',
    socketUrl: 'ws://localhost:3000',
    name: null,
    userId: null
  },
  actions: {
    authenticate(context) {
      context.commit('authenticate');
    }
  },
  mutations: {
    authenticate(state) {
      state.isLoggedIn = auth.isLoggedIn();
      state.isAdmin = auth.isAdmin();

      if (state.isLoggedIn) {
        state.name = auth.getUserName();
        state.userId = auth.getUserId();
      } else {
        state.name = null;
        state.userId = null;
      }
    },
  },
  modules: {
    quiz,
    error
  }
})
