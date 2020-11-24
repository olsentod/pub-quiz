<template>
  <v-app-bar app color="yellow darken-4">
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
        transition="scale-transition"
        width="40"
      />

      <v-img
        alt="Vuetify Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
        width="100"
      />
    </div>

    <v-spacer></v-spacer>

    <v-btn to="/" text class="mr-2">
      <span>Home</span>
    </v-btn>

    <v-btn v-if="!$store.state.isLoggedIn" to="/register" text class="mr-2">
      <span>Register</span>
    </v-btn>

    <v-btn v-if="!$store.state.isLoggedIn" to="/login" >
      <span>Login</span>
    </v-btn>

    <v-btn v-if="$store.state.isLoggedIn" @click.prevent="logout()">
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
      this.$router.push({name: 'home'});
    }
  }
}
</script>