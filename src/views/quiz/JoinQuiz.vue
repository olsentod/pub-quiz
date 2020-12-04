<template>
  <v-layout class="justify-center px-5 py-10">
    <v-card class="rounded-xl py-4" max-width="400" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4">JOIN QUIZ</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="validForm" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Room Code"
                v-model="code"
                :rules="[rules.required, rules.code]"
              />
            </v-col>
            <v-col class="text-center" cols="12">
              <v-btn
                type="submit"
                depressed
                rounded
                large
                class="px-10"
                color="yellow darken-4 white--text"
              >
                JOIN
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
      code: "",
      rules: {
        required: (v) => !!v || "Required.",
        code: (v) => v.length == 4 || "Must be 4 characters.",
      },
    };
  },
  created() {
    if(this.$route.params.code){
      this.code = this.$route.params.code;
    }
  },
  methods: {
    async onSubmit() {
      if (!this.validForm) return;

      this.$router.push({ name: 'Quiz', params: { code: this.code } })
    },
  },
};
</script>
