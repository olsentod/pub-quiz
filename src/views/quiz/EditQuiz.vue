<template>
  <v-layout class="justify-center py-10">
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
                :key="quiz._id + question.q"
                elevation="0"
                class="mb-5 grey lighten-4"
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-row>
                      <v-col cols="6">
                        <v-textarea
                          label="Quiz Description"
                          rows="2"
                          auto-grow
                          :value="question.q"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="6">
                        <v-textarea
                          label="Quiz Description"
                          rows="2"
                          auto-grow
                          :value="question.a"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
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
                type="submit"
                depressed
                outlined
                rounded
                large
                class="px-10"
                color="yellow darken-4 white--text"
                @click="$emit('cancel');"
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
    async onSubmit() {
      if (!this.validForm) return;
    },
  },
  props: ["quiz"],
};
</script>
