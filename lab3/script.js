fetch("questions.json")
  .then(response => response.json())
  .then(questions => {
    let currentQuestionIndex = 0;
    let score = 0;
    let answers = [];

    function renderQuiz() {
      const app = document.getElementById('quiz-app');
      if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        app.innerHTML = `
          <h2>${currentQuestion.question}</h2>
          ${currentQuestion.options.map((option, index) => `
            <label>
              <input type="radio" name="option" value="${option}">
              ${option}
            </label>
          `).join('')}
          <button id="next-btn" disabled>Next</button>
        `;

        const options = app.querySelectorAll('input[name="option"]');
        const nextButton = app.querySelector('#next-btn');
        options.forEach(option => {
          option.addEventListener('change', () => {
            nextButton.disabled = false;
          });
        });

        nextButton.addEventListener('click', () => {
          const selectedOption = app.querySelector('input[name="option"]:checked').value;
          answers.push({ question: currentQuestion.question, answer: selectedOption });
          if (selectedOption === currentQuestion.answer) score++;
          currentQuestionIndex++;
          renderQuiz();
        });
      } else {
        renderResult();
      }
    }

    function renderResult() {
      const app = document.getElementById('quiz-app');
      app.innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <h3>Review Your Answers:</h3>
        <ul>
          ${answers.map((item, index) => `
            <li>
              <strong>Question ${index + 1}:</strong> ${item.question}<br>
              <strong>Your Answer:</strong> ${item.answer}<br>
              <strong>Correct Answer:</strong> ${questions[index].answer}
            </li>
          `).join('')}
        </ul>
        <button id="restart-btn">Restart Quiz</button>
      `;
      document.getElementById('restart-btn').addEventListener('click', restartQuiz);
    }

    function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      answers = [];
      renderQuiz();
    }

    renderQuiz();
  });
