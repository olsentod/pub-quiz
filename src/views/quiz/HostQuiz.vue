<template>
  <v-layout class="justify-center px-5 py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center mb-3">
        <h2 class="yellow--text text--darken-4">HOST QUIZ</h2>
      </v-card-title>
      <v-card-subtitle class="text-center">
        <h3>Choose a quiz below to create a room.</h3>
      </v-card-subtitle>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="quiz in $store.state.quiz.quizzes"
              :key="quiz._id"
              @click.prevent="hostRoom(quiz._id)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="quiz.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-text="quiz.description"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action class="flex-row">
                <v-list-item-action-text
                  v-text="
                    `${quiz.questions.length} Question${
                      quiz.questions.length > 1 ? 's' : ''
                    }`
                  "
                />
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { io } from "socket.io-client";
import * as auth from "../../services/AuthService";

export default {
  data() {
    return {
      validForm: false,
      rules: {
        required: (v) => !!v || "Required.",
      },
    };
  },
  methods: {
    hostRoom(quizId) {
      this.socket = io("ws://localhost:3000");

      this.socket.on("connect", () => {
        this.socket.emit("host-room", {
          token: auth.getToken(),
          quizId,
        });

        this.socket.on("message", ({ code }) => {
          this.$router.push({ name: "Quiz", params: { code } });
        });
      });
    },
  },
  created() {
    this.$store.dispatch("quiz/getQuizzes");
  },
};
</script>
