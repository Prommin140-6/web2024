new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      step: 'start',
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      score: 0
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    }
  },
  methods: {
    async startQuiz() {
      const response = await fetch('quiz_questions.json');
      const data = await response.json();
      this.questions = data.map(question => ({
        ...question,
        options: question.choices
      }));
      this.answers = Array(this.questions.length).fill(null);
      this.step = 'quiz';
    },
    selectAnswer(option) {
      this.$set(this.answers, this.currentQuestionIndex, option);
    },
    nextQuestion() {
      this.currentQuestionIndex++;
    },
    prevQuestion() {
      this.currentQuestionIndex--;
    },
    checkAnswers() {
      this.score = this.questions.reduce((total, question, index) => {
        return total + (this.answers[index] === question.answer ? 1 : 0);
      }, 0);
      this.step = 'result';
    },
    restartQuiz() {
      this.step = 'start';
      this.questions = [];
      this.currentQuestionIndex = 0;
      this.answers = [];
      this.score = 0;
    }
  }
});
