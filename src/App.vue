<template>
  <v-app>
    <Navbar />
    <v-main>
      <ErrorToaster/>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import ErrorToaster from "./components/ErrorToaster";
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    ErrorToaster,
    Navbar
  },
  beforeCreate() {
    this.$store.dispatch("authenticate");
  },
};
</script>