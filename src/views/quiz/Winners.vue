<template>
  <v-layout class="justify-center px-5 py-10">
    <v-card class="rounded-xl py-4" max-width="500" width="100%">
      <v-card-title class="justify-center mb-2" v-if="!finished">
        <h2 class="yellow--text text--darken-4">LEADERBOARD</h2>
      </v-card-title>
      <v-card-subtitle class="text-center" v-if="!finished">
        <h3>Correct answer: {{correctAnswer}}</h3>
      </v-card-subtitle>
      <v-card-title class="justify-center" v-if="finished">
        <h2 class="yellow--text text--darken-4">FINAL LEADERBOARD</h2>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item v-for="(player, index) in players" :key="player.id">
            <v-list-item-content>
              <v-list-item-title
                >{{ index + 1 }} - {{ player.name }} ({{
                  player.points
                }}
                pts)</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions v-if="isHost && !finished" class="justify-center">
        <v-btn
          type="submit"
          depressed
          rounded
          large
          class="px-10 mb-3"
          color="yellow darken-4 white--text"
          @click="$emit('move-on')"
        >
          Next Question
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["players", "isHost", "finished", "correctAnswer"],
};
</script>
