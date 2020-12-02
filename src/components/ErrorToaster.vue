<template>
  <div>
    <v-snackbar
      v-for="error of $store.state.error.errors"
      :value="true"
      :key="error.id"
      color="red"
    >
      {{ error.message }}
    </v-snackbar>
  </div>
</template>
