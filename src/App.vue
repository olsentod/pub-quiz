<template>
  <v-app class='quicksand-font'>
    <Navbar />
    <v-main style="background-color: #FDD835">
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

<style>
.quicksand-font {
  font-family: 'Quicksand', sans-serif;
}
.v-card{
  padding: 0 1rem;
}
.v-card__title{
  word-break: normal!important;
}
.v-btn
{
  font-weight: 600;
}
</style>