<template>
  <v-layout class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="500" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4 mb-5">
          Question {{ number }}
        </h2>
      </v-card-title>
      <v-card-subtitle>
        <h2 class="text-center">{{ question.q }}</h2>
      </v-card-subtitle>
      <v-card-text>
        <v-form v-model="validForm" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12">
              <v-text-field
                :rules="[rules.required]"
                label="Answer"
                v-model="answer"
              ></v-text-field>
            </v-col>
            <v-col class="text-center" cols="12"
              ><v-btn
                type="submit"
                depressed
                rounded
                large
                class="px-10"
                color="yellow darken-4 white--text"
              >
                SUBMIT
              </v-btn></v-col
            >
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
      answer: "",
      validForm: false,
      rules: {
        required: (v) => !!v || "Required.",
      },
    };
  },
  methods: {
    onSubmit(){
      if (!this.validForm) return;

      this.$emit('answer', this.answer);
    }
  },
  props: ["question", "number"],
};
</script>
