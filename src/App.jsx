import { useState } from "react";
import "./App.css";

// Sample questions
const questions = [
  {
    id: 1,
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Makeup Language",
      "Hyper Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correct: 1,
    explanation:
      "HTML stands for Hyper Text Markup Language. It's the standard markup language for web pages.",
  },
  {
    id: 2,
    question: "Which CSS property controls text size?",
    options: ["font-size", "text-style", "text-size", "font-weight"],
    correct: 0,
    explanation: "The font-size property specifies the size of the text.",
  },
  {
    id: 3,
    question: "Inside which HTML element do we put JavaScript?",
    options: ["<js>", "<javascript>", "<script>", "<code>"],
    correct: 2,
    explanation:
      "The <script> element is used to define client-side JavaScript in HTML.",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const current = questions[index];

  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (i === current.correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setAnswered(false);
      setSelected(null);
    } else {
      setShowSummary(true);
    }
  };

  if (showSummary) {
    return (
      <div className="container">
        <h2>🎉 Quiz Complete!</h2>
        <p>
          You scored <strong>{score}</strong> out of {questions.length}
        </p>
        <h3>Review:</h3>
        <ul>
          {questions.map((q, i) => (
            <li key={i}>
              <strong>{q.question}</strong>
              <br />
              ✅ Correct Answer: {q.options[q.correct]}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="progress">
        <div
          className="bar"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      <h3>
        Question {index + 1} of {questions.length}
      </h3>
      <h2>{current.question}</h2>
      <div className="options">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className={`option ${
              selected === i
                ? i === current.correct
                  ? "correct"
                  : "wrong"
                : ""
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <p className="explanation">
          {selected === current.correct ? "✅ Correct!" : "❌ Incorrect!"}
          <br />
          💡 {current.explanation}
        </p>
      )}
      {answered && (
        <button className="next" onClick={handleNext}>
          Next ➜
        </button>
      )}
    </div>
  );
}
