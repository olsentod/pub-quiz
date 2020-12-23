<template>
  <div>
    <v-app-bar app elevation="2">
      <div class="d-flex align-center">
        <h1 class="yellow--text text--darken-4 logo">DUCK DUCK QUIZ</h1>
      </div>
      <v-spacer></v-spacer>

      <v-toolbar class="hidden-xs-only justify-end" flat color="transparent">
        <v-spacer></v-spacer>

        <v-btn to="/" text class="mr-2">Home</v-btn>

        <v-btn
          v-if="!$store.state.isLoggedIn"
          to="/login"
          text
          class="yellow darken-1"
          >Login
        </v-btn>

        <v-btn v-if="$store.state.isLoggedIn" to="/join" text class="mr-2">
          Join
        </v-btn>

        <v-btn v-if="$store.state.isLoggedIn" to="/host" text class="mr-2">
          Host
        </v-btn>

        <v-btn
          v-if="$store.state.isAdmin"
          to="/admin/quiz/list"
          text
          class="mr-2"
        >
          Quizzes
        </v-btn>

        <v-btn
          v-if="$store.state.isLoggedIn"
          to="/"
          @click.prevent="logout()"
          class="yellow darken-1"
        >
          Logout
        </v-btn>
      </v-toolbar>

      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-sm-and-up align-self-end"
      ></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item to="/">
            <v-list-item-title>
              Home
            </v-list-item-title>
          </v-list-item>

          <v-list-item to="/login" v-if="!$store.state.isLoggedIn" class="yellow darken-1">
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>

          <v-list-item to="/join" v-if="$store.state.isLoggedIn">
            <v-list-item-title>Join</v-list-item-title>
          </v-list-item>

          <v-list-item to="/host" v-if="$store.state.isLoggedIn">
            <v-list-item-title>Host</v-list-item-title>
          </v-list-item>

          <v-list-item to="/admin/quiz/list" v-if="$store.state.isAdmin">
            <v-list-item-title>Quizzes</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/"
            @click.prevent="logout()"
            v-if="$store.state.isLoggedIn"
            class="yellow darken-1"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    logout: function() {
      auth.logout();
      if (this.$route.path != "/") {
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>

<style>
@media (max-width: 768px){
.logo{
 font-size: 1.25rem; 
}
}
</style>