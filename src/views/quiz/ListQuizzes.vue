<template>
  <v-layout class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4">QUIZZES</h2>
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="quiz in $store.state.quiz.quizzes"
              :key="quiz._id"
              :to="`/admin/quiz/edit/${quiz._id}`"
            >
              <v-list-item-content>
                <v-list-item-title v-text="quiz.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action class="flex-row">
                <v-btn
                  @click.prevent="$store.dispatch('quiz/deleteQuiz', quiz._id)"
                  icon
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-row>
          <v-col class="text-center">
            <v-btn
              to="/admin/quiz/new"
              depressed
              rounded
              large
              color="yellow darken-4 white--text"
              class="px-10"
            >
              Create Quiz
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("quiz/getQuizzes");
  },
};
</script>
