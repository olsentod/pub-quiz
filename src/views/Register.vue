<template>
  <v-layout class="justify-center py-10">
    <v-card class="rounded-xl py-4" max-width="800" width="100%">
      <v-card-title class="justify-center">
        <h2 class="yellow--text text--darken-4">REGISTER</h2>
      </v-card-title>
      <v-card-text>
        <v-form v-model="validForm" @submit.prevent="onSubmit">
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="user.first"
                label="First Name"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user.last"
                label="Last Name"
                :rules="[rules.required]"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user.email"
                label="Email"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="user.password"
                :append-icon="passwordShow ? 'mdi-eye-off' : 'mdi-eye'"
                :rules="[rules.required, rules.min]"
                :type="passwordShow ? 'password' : 'text'"
                name="input-10-2"
                label="Password"
                hint="At least 8 characters"
                class="input-group--focused"
                @click:append="passwordShow = !passwordShow"
              ></v-text-field>
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
                GET QUIZZIN'
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import * as auth from "../services/AuthService";

export default {
  data() {
    return {
      user: {
        first: "",
        last: "",
        email: "",
        password: "",
      },
      passwordShow: true,
      validForm: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (v) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail.";
        },
      },
    };
  },
  methods: {
    onSubmit: async function() {
      if (!this.validForm) return;

      if (await auth.registerUser(this.user)) {
        await auth.login(this.user);
        this.$router.push({ name: "Home" });
      }
    },
  },
};
</script>
