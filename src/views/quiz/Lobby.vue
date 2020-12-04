<template>
  <v-layout class="justify-center px-5 py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center text-center mb-3">
        <h2 class="yellow--text text--darken-4">{{quizName}}</h2>
      </v-card-title>
      <v-card-subtitle class="text-center">
        <h2>
          Join Code:
          <v-tooltip v-model="showCopied" top>
            <template v-slot:activator="{ on }">
              <input
                type="text"
                ref="roomCode"
                class="roomCode"
                :value="code"
                size="4"
                readonly="readonly"
              />
              <input type="hidden" v-on="on" />
            </template>
            <span>Copied</span>
          </v-tooltip>
        </h2>
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="6" lg="4" v-for="player in players" :key="player.id">
            <h3 class="text-center">{{ player.name }} {{ player.tag == 'host' ? `(${player.tag})` : '' }}</h3>
          </v-col>
        </v-row>
        <v-row v-if="$store.state.userId == host.id">
          <v-col class="text-center" cols="12"
            ><v-btn
              depressed
              rounded
              large
              class="px-10"
              color="yellow darken-4 white--text"
              @click.prevent="$emit('start')"
            >
              START!
            </v-btn></v-col
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      showCopied: false,
    };
  },
  mounted() {
    this.$refs.roomCode.addEventListener("click", () => {
      this.$refs.roomCode.select();
      document.execCommand("copy");
      this.showCopied = true;
      setTimeout(() => {
        this.showCopied = false;
      }, 1000);
    });
  },
  props: ["players", "host", "code", "quizName"],
};
</script>

<style>
.roomCode {
  cursor: pointer;
  outline: none;
}
.roomCode::selection {
  color: inherit;
  background: transparent;
}
</style>
