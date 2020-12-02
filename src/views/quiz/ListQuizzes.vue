<template>
  <v-layout class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4">QUIZZES</h2>
      </v-card-title>
      <v-card-text>
        <v-list subheader two-line>
          <v-list-item v-for="quiz in quizzes" :key="quiz._id">
            <v-list-item-content>
              <v-list-item-title v-text="quiz.name"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-action class="flex-row">
              <v-btn @click.prevent="$emit('choose-quiz', quiz._id)" icon>
                <v-icon>mdi-playlist-edit</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-row>
          <v-col class="text-center">
            <v-btn>
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
  props: ['quizzes']
};
</script>
