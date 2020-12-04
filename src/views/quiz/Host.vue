<template>
  <v-layout class="align-center px-5 py-10 flex-column">
    <v-row style="max-width: 1200px; width: 100%;">
      <v-col cols="12" class="text-center">
      <h1 class="grey--text text--darken-4">{{ question.q }}</h1>
      <h2 class="grey--text text--darken-3">{{ question.a }}</h2>

      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="({ user, answer }, index) in answers"
        :key="index"
        style="cursor: pointer"
        @click.prevent="$emit('choose', answers[index])"
      >
        <v-card class="rounded-xl py-4">
          <v-card-title class="justify-center">
            <h3>{{ answer }}</h3>
          </v-card-title>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        class="text-center"
        v-if="numOfPlayers - answers.length > 0"
      >
        <h3>
          Waiting on {{ numOfPlayers - answers.length }} answer{{
            numOfPlayers - answers.length > 1 ? "s" : ""
          }}
        </h3>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  props: ["question", "answers", "numOfPlayers"],
};
</script>
