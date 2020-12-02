<template>
  <v-layout class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4">QUIZ LOBBY</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4" v-for="player in players" :key="player._id">
            <h3 class="text-center">{{player.name}} ({{player.tag}})</h3>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["players"],
};
</script>
