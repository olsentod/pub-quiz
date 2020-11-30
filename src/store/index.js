import Vue from 'vue'
import Vuex from 'vuex'
import * as auth from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    apiUrl: 'http://localhost:3000/api',
    name: null,
    userId: null,
    errors: []
  },
  mutations: {
    authenticate(state){
      state.isLoggedIn = auth.isLoggedIn();
      if(state.isLoggedIn){
        state.name = auth.getUserName();
        state.userId = auth.getUserId();
      } else {
        state.name = null;
        state.userId = null;
      }
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
