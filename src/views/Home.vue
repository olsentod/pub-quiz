<template>
  <v-layout class="justify-center px-5 py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center mb-3">
        <h2 class="yellow--text text--darken-4">Welcome!</h2>
      </v-card-title>
      <!-- <v-card-subtitle class="text-center">
        <h3>Instructions</h3>
      </v-card-subtitle> -->
      <v-card-text>
        
        <p>
          You can either host a quiz or join a quiz. To host a quiz, login, visit the
          Host tab, and select a quiz. A random join code will be generated that
          you can share with others to join.
        </p>
        <p>
          Once the quiz begins, the host has ability to select the correct
          answer, which will award points to the user. At the end of the quiz,
          the user with the most correct answers wins!
        </p>
        <v-row class="justify-center">
          <v-btn
            type="submit"
            depressed
            rounded
            large
            class="px-10"
            color="yellow darken-4 white--text"
            to="/host"
          >
            Get Started!
          </v-btn>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
  components: {},
};
</script>
