<template>
  <div>
    <Lobby
      v-if="players.length > 0 && !started"
      :players="players"
      :host="host"
      @start="startQuiz"
    />
    <Question
      v-if="started"
      :question="question"
      :number="number"
      @answer="answerQuestion"
    />
    <!-- Host -->
  </div>
</template>

<script>
import Lobby from "./Lobby";
import Question from "./Question";
import { io } from "socket.io-client";
import { showError } from "../../services/ErrorService";
import * as auth from "../../services/AuthService";

export default {
  data() {
    return {
      code: "",
      players: [],
      host: null,
      socket: null,
      started: false,
      number: 0,
      question: null,
    };
  },
  methods: {
    startQuiz() {
      this.socket.emit("start-quiz", {
        token: auth.getToken(),
        code: this.code,
      });
    },
    answerQuestion(answer){
      this.socket.emit("answer", {
        token: auth.getToken(),
        code: this.code,
        answer
      });
    }
  },
  created() {
    if (this.$route.params.code) {
      this.code = this.$route.params.code;
    }

    this.socket = io("ws://localhost:3000");

    this.socket.on("connect", () => {
      this.socket.emit("join-room", {
        token: auth.getToken(),
        code: this.code,
      });
    });

    this.socket.on("message", (host) => {
      this.host = host;
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

    this.socket.on("player-answer", (data) => {
      console.log(data);
    });

    this.socket.on("question", (data) => {
      if (!this.started) this.started = true;
      this.number = data.number;
      this.question = data.question;
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  components: {
    Lobby,
    Question,
  },
};
</script>
