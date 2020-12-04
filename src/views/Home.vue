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
        <p>Duck Duck Quiz is a quiz game. Login or register to start.</p>
        <p>
          Once you have logged in, anyone can host a quiz by clicking on it in
          the navigation. Once you start hosting a quiz, it will create a lobby
          for your room and a join code. Share that code with your friends for
          them to join!
        </p>
        <p>
          Everyone in the room gets to answer the list of questions. As the host
          you will recieve the answers of the participants. Choose the first and
          most correct answer. At the end of the quiz, the person with the most
          points wins!
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
