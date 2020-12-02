<template>
  <div>
    <Lobby v-if="players.length > 0" :players="players"/>
    <!-- <p v-for="player of players" :key="player.id">
      {{ player.name }}
    </p> -->
  </div>
</template>

<script>
import Lobby from "./Lobby";
import { io } from "socket.io-client";
import { showError } from "../../services/ErrorService";

export default {
  data() {
    return {
      code: "",
      players: [],
      socket: null,
    };
  },
  created() {
    if (this.$route.params.code) {
      this.code = this.$route.params.code;
    }

    this.socket = io("ws://localhost:3000");

    this.socket.on("connect", () => {
      this.socket.emit("join-room", {
        _id: this.$store.state.userId,
        name: this.$store.state.name,
        code: this.code,
      });
    });

    this.socket.on("failed-join", (error) => {
      showError(error);
      this.$router.push({ name: "Join" });
    });

    this.socket.on("player-joined", (data) => {
      this.players = data;
    });

    this.socket.on("player-left", (data) => {
      this.players = data;
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  components: {
    Lobby,
  },
};
</script>
