<template>
  <div>
    <Lobby
      v-if="players.length > 0 && !started"
      :players="players"
      :host="host"
      :code="code"
      :quizName="quizName"
      @start="startQuiz"
    />
    <Question
      v-if="started && $store.state.userId != host.id && !finished"
      :question="question"
      :number="number"
      :key="question._id"
      @answer="answerQuestion"
    />
    <Host
      v-if="started && $store.state.userId == host.id && !finished"
      :answers="answers"
      :question="question"
      :numOfPlayers="currentPlayers.length"
      @choose="selectAnswer"
    />
    <Winners v-if="finished" :players="players" />
  </div>
</template>

<script>
import Lobby from "./Lobby";
import Host from "./Host";
import Question from "./Question";
import Winners from "./Winners";

import { io } from "socket.io-client";
import { showError } from "../../services/ErrorService";
import * as auth from "../../services/AuthService";

export default {
  data() {
    return {
      code: "",
      players: [],
      answers: [],
      quizName: '',
      host: null,
      socket: null,
      started: false,
      finished: false,
      number: 0,
      question: null,
    };
  },
  computed: {
    currentPlayers() {
      return this.players.filter((p) => p.tag == "player");
    },
  },
  methods: {
    answerQuestion(answer) {
      this.socket.emit("answer", {
        token: auth.getToken(),
        code: this.code,
        answer,
      });
    },
    startQuiz() {
      this.socket.emit("start-quiz", {
        token: auth.getToken(),
        code: this.code,
      });
    },
    selectAnswer(answer) {
      this.socket.emit("next-question", {
        token: auth.getToken(),
        code: this.code,
        answer,
      });
    },
  },
  created() {
    if (this.$route.params.code) {
      this.code = this.$route.params.code;
    }

    this.socket = io("ws://localhost:3000");

    /**
     * Recieved when a player connects with Socket.io
     */
    this.socket.on("connect", () => {
      /**
       * To join a room, the player must provide auth token and room code
       */
      this.socket.emit("join-room", {
        token: auth.getToken(),
        code: this.code,
      });
    });

    /**
     * Reply from server after initially connecting
     * @param {Object} game The game
     */
    this.socket.on("message", (game) => {
      console.log(game);
      this.host = game.host;
      this.quizName = game.quiz.name;
    });

    /**
     * Recieved when failing to join a room
     * @param {Error} error Error
     */
    this.socket.on("failed-join", (error) => {
      showError(error);
      this.$router.push({ name: "Join" });
    });

    /**
     * Recieved when a player joins the room
     * @param {Array} data Updated players array
     */
    this.socket.on("player-joined", (data) => {
      this.players = data;
    });

    /**
     * Recieved when a player leaves the room
     * @param {Array} data The answer
     */
    this.socket.on("player-left", (data) => {
      if(this.finished) return;
      this.players = data;
    });

    /**
     * FOR HOST
     * Recieved when a player sends an answer
     * @param {Object} data The answer
     */
    this.socket.on("player-answer", (data) => {
      this.answers.push(data);
    });

    /**
     * Recieved when a new question is being asked
     * @param {Object} data The new question
     */
    this.socket.on("question", (data) => {
      if (!this.started) this.started = true;
      this.number = data.number;
      this.question = data.question;
      this.answers = [];
    });

    /**
     * Recieved when the quiz is finished
     * @param {Array} data List of players with updated scores
     */
    this.socket.on("quiz-end", (data) => {
      this.finished = true;
      this.players = data
        .sort((a, b) => b.points - a.points)
        .filter((p) => p.tag == "player");
    });
  },
  beforeDestroy() {
    this.socket.close();
  },
  components: {
    Lobby,
    Host,
    Question,
    Winners,
  },
};
</script>
