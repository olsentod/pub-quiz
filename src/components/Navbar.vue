<template>
  <v-app-bar app>
    <div class="d-flex align-center">
      <h1 class="yellow--text text--darken-4">DUCK DUCK QUIZ</h1>
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/" text class="mr-2">
      <span>Home</span>
    </v-btn>

    <v-btn v-if="!$store.state.isLoggedIn" to="/register" text class="mr-2">
      <span>Register</span>
    </v-btn>

    <v-btn v-if="!$store.state.isLoggedIn" to="/login" class="yellow darken-1">
      <span>Login</span>
    </v-btn>

    <v-btn v-if="$store.state.isLoggedIn" to="/join" text class="mr-2">
      <span>Join</span>
    </v-btn>

    <v-btn v-if="$store.state.isLoggedIn" to="/host" text class="mr-2">
      <span>Host</span>
    </v-btn>

    <v-btn v-if="$store.state.isAdmin" to="/admin/quiz/list" text class="mr-2">
      <span>Quizzes</span>
    </v-btn>

    <v-btn v-if="$store.state.isLoggedIn" to="/" @click.prevent="logout()" class="yellow darken-1">
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
import * as auth from '../services/AuthService';

export default {
  name: 'Navbar',
  methods: {
    logout: function(){
      auth.logout();
      if(this.$route.path != '/'){
        this.$router.push({name: 'Home'});
      }
    }
  }
}
</script>