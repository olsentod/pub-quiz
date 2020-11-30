<template>
  <div>
    <Lobby v-if="players.length > 0" />
      <p v-for="player of players" :key="player.id">
        {{player.name}}
      </p>
    <!-- Lobby -->
    <!-- Quiz questions -->
  </div>
</template>

<script>
import Lobby from "./Lobby";
import { io } from "socket.io-client";

export default {
  data() {
    return {
      code: "",
      players: [],
      socket: null
    };
  },
  created() {
    console.log('created');
    if (this.$route.params.code) {
      this.code = this.$route.params.code;
    }
    
    this.socket = io("ws://localhost:3000");

    this.socket.on("connect", () => {
      this.socket.emit("join-room", {
        id: this.$store.state.userId,
        name: this.$store.state.name,
        code: this.code,
      });
    });

    this.socket.on("message", () => {
      this.joined = true;
      console.log('You have joined the room.');
    });

    this.socket.on("player-joined", (data) => {
      this.players = data;
    });

    this.socket.on("player-left", (data) => {
      this.players = data;
    });
  },
  beforeDestroy(){
    this.socket.close();
  },
  components: {
    Lobby,
  },
};
</script>
