<template>
  <div>
    <EditQuiz v-if="getSelectedQuiz" :quiz="getSelectedQuiz" @cancel="selectedQuizId = null" />
    <ListQuizzes
      v-if="!getSelectedQuiz"
      :quizzes="$store.state.quizzes"
      @choose-quiz="selectQuiz"
    />
  </div>
</template>

<script>
import EditQuiz from "./quiz/EditQuiz";
import ListQuizzes from "./quiz/ListQuizzes";

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
    selectQuiz(id) {
      this.selectedQuizId = id;
    },
  },
  async created() {
    this.$store.dispatch("getQuizzes");
  },
  components: {
    EditQuiz,
    ListQuizzes,
  },
};
</script>
