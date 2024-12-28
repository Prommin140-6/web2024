import React, { useState } from 'react';
import questions from './math_questions.json'; // หรือ quiz_thai_p6.json หากเป็นคำถามภาษาไทย

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [answers, setAnswers] = useState([]); // เก็บคำตอบที่ผู้ใช้เลือก

  const handleNext = () => {
    setAnswers([
      ...answers,
      { question: questions[currentQuestionIndex].question, answer: selectedOption }
    ]);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    setSelectedOption(null);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setAnswers([]);
  };

  if (showResult) {
    return (
      <div>
        <h2>Your Score: {score} / {questions.length}</h2>
        <h3>Review Your Answers:</h3>
        <ul>
          {answers.map((item, index) => (
            <li key={index}>
              <strong>Question {index + 1}:</strong> {item.question} <br />
              <strong>Your Answer:</strong> {item.answer} <br />
              <strong>Correct Answer:</strong> {questions[index].answer}
            </li>
          ))}
        </ul>
        <button onClick={handleRestart} style={{ marginTop: '20px' }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestionIndex < questions.length ? (
        <>
          <h2>{currentQuestion.question}</h2>
          <div>
            {currentQuestion.options.map((option, index) => (
              <label key={index} style={{ display: 'block', margin: '10px 0' }}>
                <input
                  type="radio"
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => setSelectedOption(option)}
                />
                {option}
              </label>
            ))}
          </div>
          <button onClick={handleNext} disabled={!selectedOption}>
            Next
          </button>
        </>
      ) : (
        <button onClick={handleShowResult}>
          Show Results
        </button>
      )}
    </div>
  );
}

export default Quiz;
