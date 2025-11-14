import React, { useState } from "react";
import "./quiz.css";


const QUESTIONS = [
  {
    id: 1,
    q: "What is diversification in investing?",
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg",
    choices: [
      "Putting all money in one asset",
      "Spreading investments across assets",
      "Keeping cash under mattress",
      "Only buying bonds",
    ],
    answer: 1,
  },
  {
    id: 2,
    q: "What does 'liquidity' mean?",
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg",
    choices: [
      "Return on investment",
      "How quickly an asset can be bought/sold",
      "Tax treatment",
      "Volatility measure",
    ],
    answer: 1,
  },
  {
    id: 3,
    q: "Which is generally lower risk?",
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg",
    choices: ["Stocks", "Cryptocurrency", "Government bonds", "Penny stocks"],
    answer: 2,
  },
  {
    id: 4,
    q: "What is 'asset allocation'?",
    image:"https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg",
    choices: [
      "Choosing a single stock",
      "Deciding spread between asset classes",
      "Timing the market",
      "Short-selling strategy",
    ],
    answer: 1,
  },
  {
    id: 5,
    q: "What is a mutual fund?",
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?cs=srgb&dl=pexels-pixabay-164527.jpg&fm=jpg",
    choices: [
      "A single company's bond",
      "A pooled investment vehicle",
      "An insurance policy",
      "A tax form",
    ],
    answer: 1,
  },
];

export default function QuizPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]);

  const current = QUESTIONS[index];

  function choose(i) {
    if (answered) return;
    setSelected(i);
  }

  function next() {
    if (selected === null) return;

    const isCorrect = selected === current.answer;
    if (isCorrect) setScore((s) => s + 1);

    setResults((prev) => [
      ...prev,
      {
        question: current.q,
        selected: current.choices[selected],
        correct: current.choices[current.answer],
        isCorrect,
      },
    ]);

    setAnswered(true);

    setTimeout(() => {
      setSelected(null);
      setAnswered(false);
      if (index + 1 < QUESTIONS.length) {
        setIndex((n) => n + 1);
      } else {
        setFinished(true);
      }
    }, 1500);
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
    setAnswered(false);
    setResults([]);
  }

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        {!finished ? (
          <>
            <div className="quiz-header">
              <h2>📊 Finance Quiz Challenge</h2>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${((index + 1) / QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
              <div className="progress-text">
                Question {index + 1} of {QUESTIONS.length}
              </div>
            </div>

            <div className="quiz-image">
              <img src={current.image} alt="Question visual" onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x300?text=Question";
              }} />
            </div>

            <div className="question">{current.q}</div>

            <div className="choices">
              {current.choices.map((c, i) => {
                let choiceClass = "choice";
                
                if (selected === i && !answered) {
                  choiceClass += " selected";
                }
                
                if (answered) {
                  if (i === current.answer) {
                    choiceClass += " correct";
                  } else if (i === selected && selected !== current.answer) {
                    choiceClass += " incorrect";
                  }
                }
                
                return (
                  <button
                    key={i}
                    className={choiceClass}
                    onClick={() => choose(i)}
                    disabled={answered}
                  >
                    <span className="choice-letter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="choice-text">{c}</span>
                    {answered && i === current.answer && (
                      <span className="check">✓</span>
                    )}
                    {answered && i === selected && i !== current.answer && (
                      <span className="cross">✕</span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="actions">
              <button
                className="btn-next"
                onClick={next}
                disabled={selected === null || answered}
              >
                {answered ? "Loading..." : index + 1 === QUESTIONS.length ? "Finish" : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <div className="result-page">
            <div className="result-animation">
              <div className="score-circle">
                <div className="score-text">
                  <span className="score-number">{score}</span>
                  <span className="score-total">/{QUESTIONS.length}</span>
                </div>
              </div>
            </div>

            <h2>Quiz Complete! 🎉</h2>

            <div className="score-message">
              {score === QUESTIONS.length && (
                <p>Perfect Score! You're a finance expert! </p>
              )}
              {score >= QUESTIONS.length * 0.8 && score < QUESTIONS.length && (
                <p>Excellent! You know your finance well! </p>
              )}
              {score >= QUESTIONS.length * 0.6 && score < QUESTIONS.length * 0.8 && (
                <p>Good job! Keep learning! </p>
              )}
              {score < QUESTIONS.length * 0.6 && <p>Not bad! Try again to improve! </p>}
            </div>

            <div className="results-review">
              <h3>Review Your Answers</h3>
              <div className="results-list">
                {results.map((r, i) => (
                  <div key={i} className={`result-item ${r.isCorrect ? "correct" : "incorrect"}`}>
                    <div className="result-question">
                      Q{i + 1}: {r.question}
                    </div>
                    <div className="result-answer">
                      <span className={`your-answer ${r.isCorrect ? "green" : "red"}`}>
                        {r.isCorrect ? "✓" : "✕"} Your answer: {r.selected}
                      </span>
                      {!r.isCorrect && (
                        <span className="correct-answer">✓ Correct: {r.correct}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="result-actions">
              <button className="btn-restart" onClick={restart}>
                🔄 Retry Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}