<template>
  <div>
    <!-- <EditQuiz
      v-if="getSelectedQuiz"
      :quiz="getSelectedQuiz"
      @cancel="cancel"
      @update="updateQuiz"
    />
    <ListQuizzes
      v-if="!getSelectedQuiz"
      :quizzes=""
      @choose-quiz="selectQuiz"
    /> -->
  </div>
</template>

<script>
// import EditQuiz from "./quiz/EditQuiz";
// import ListQuizzes from "./quiz/ListQuizzes";

export default {
  data() {
    return {
      selectedQuizId: "",
    };
  },
  computed: {
    getSelectedQuiz() {
      return this.$store.state.quizzes.filter(
        (q) => q._id == this.selectedQuizId
      )[0];
    },
  },
  methods: {
    cancel(){
      this.selectedQuizId = null
      this.$store.dispatch("getQuizzes");
    },
    selectQuiz(id) {
      this.selectedQuizId = id;
    },
    updateQuiz(quiz) {
      this.$store.dispatch("updateQuiz", quiz);
      this.selectedQuizId = null;
    },
  },
  async created() {
    this.$store.dispatch("getQuizzes");
  },
  components: {
    // EditQuiz,
    // ListQuizzes,
  },
};
</script>
