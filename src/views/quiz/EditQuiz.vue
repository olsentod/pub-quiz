<template>
  <v-layout v-if="quiz" class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-text>
        <v-form v-model="validForm" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Quiz Name"
                v-model="quiz.name"
                :rules="[rules.required]"
              />
              <v-textarea
                label="Quiz Description"
                rows="1"
                auto-grow
                v-model="quiz.description"
              ></v-textarea>
              <v-card
                v-for="question of quiz.questions"
                :key="question._id"
                elevation="0"
                class="mb-5 grey lighten-4"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="6">
                        <v-textarea
                          label="Question"
                          rows="2"
                          auto-grow
                          v-model="question.q"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="6">
                        <v-textarea
                          label="Answer"
                          rows="2"
                          auto-grow
                          v-model="question.a"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                  <v-list-item-action>
                    <v-btn
                      @click.prevent="moveUp(question._id)"
                      icon
                      title="Move Question Up"
                    >
                      <v-icon>mdi-chevron-up</v-icon>
                    </v-btn>
                    <v-btn
                      @click.prevent="removeQuestion(question._id)"
                      icon
                      title="Delete Question"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                    <v-btn
                      @click.prevent="moveDown(question._id)"
                      icon
                      title="Move Question Down"
                    >
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col class="text-center mb-10" cols="12">
              <v-btn
                depressed
                rounded
                class="px-10 mr-5"
                color="yellow darken-4 white--text"
                @click="addQuestion"
              >
                Add Question
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="12">
              <v-btn
                type="submit"
                depressed
                rounded
                large
                class="px-10 mr-5"
                color="yellow darken-4 white--text"
              >
                Save Quiz
              </v-btn>
              <v-btn
                to="/admin/quiz/list"
                depressed
                outlined
                rounded
                large
                class="px-10"
                color="yellow darken-4 white--text"
              >
                Cancel
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import Vue from "vue";

export default {
  data() {
    return {
      quiz: null,
      validForm: false,
      rules: {
        required: (v) => !!v || "Required.",
      },
    };
  },
  methods: {
    async onSubmit() {
      if (!this.validForm) return;

      if (this.$route.params.id) {
        this.$store.dispatch("updateQuiz", this.quiz);
      } else {
        this.$store.dispatch("createQuiz", this.quiz);
      }
      this.$router.push({ name: "ListQuizzes" });
    },
    getQuestionIndexFromId(id) {
      return this.quiz.questions.findIndex((q) => q._id == id);
    },
    moveUp(id) {
      const index = this.getQuestionIndexFromId(id);
      if (index == 0) return;

      const temp = this.quiz.questions[index - 1];
      Vue.set(this.quiz.questions, index - 1, this.quiz.questions[index]);
      Vue.set(this.quiz.questions, index, temp);
    },
    moveDown(id) {
      const index = this.getQuestionIndexFromId(id);
      if (index == this.quiz.questions.length - 1) return;

      const temp = this.quiz.questions[index + 1];
      Vue.set(this.quiz.questions, index + 1, this.quiz.questions[index]);
      Vue.set(this.quiz.questions, index, temp);
    },
    addQuestion() {
      this.quiz.questions.push({
        _id: new Date() * 13, // Temp ID
        q: "",
        a: "",
      });
    },
    removeQuestion(id) {
      const index = this.getQuestionIndexFromId(id);
      Vue.delete(this.quiz.questions, index);
    },
  },
  async created() {
    if (this.$route.params.id) {
      this.quiz = await this.$store.dispatch("getQuiz", this.$route.params.id);
    } else {
      this.quiz = { name: "", description: "", questions: [] };
    }
  },
};
</script>
