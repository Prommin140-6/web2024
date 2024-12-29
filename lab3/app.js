const QuizApp = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [answers, setAnswers] = React.useState([]);
  const [questions, setQuestions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);

  React.useEffect(() => {
    // โหลดคำถามจากไฟล์ JSON
    fetch("questions.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option); // บันทึกคำตอบที่เลือก
  };

  const handleNext = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.answer;

    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null); // รีเซ็ตคำตอบที่เลือก
    } else {
      setCurrentQuestionIndex(-1); // จบข้อสอบ
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedOption(null);
  };

  if (questions.length === 0) {
    return <div>กำลังโหลดคำถาม...</div>;
  }

  if (currentQuestionIndex === -1) {
    return (
      <div className="results">
        <h2>คะแนนของคุณ: {score} / {questions.length}</h2>
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <strong>ข้อที่ {index + 1}: {answer.question}</strong><br />
              คำตอบของคุณ: {answer.selected}<br />
              คำตอบที่ถูกต้อง: {answer.correct}
            </li>
          ))}
        </ul>
        <button onClick={handleRestart}>ทำข้อสอบอีกครั้ง</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  return (
    <div className="quiz">
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <label key={index}>
          <input
            type="radio"
            name="option"
            value={option}
            onChange={() => handleOptionSelect(option)}
            checked={selectedOption === option}
          />
          {option}
        </label>
      ))}
      <button onClick={handleNext} disabled={!selectedOption}>
        Next
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("quiz-app")).render(<QuizApp />);
