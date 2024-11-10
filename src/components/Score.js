import React from 'react';
import './Score.css';

const Score = ({ score, totalQuestions, correctAnswers, wrongAnswers, skippedAnswers, startQuiz }) => {
    return (
        <div className="score-container">
            <h2 className="score-title">Quiz Completed</h2>
            <div className="score-card">
                <p className="score-detail">Total Score: <span className="score-number">{score} / {totalQuestions}</span></p>
                <p className="score-detail correct">Correct Answers: <span>{correctAnswers}</span></p>
                <p className="score-detail wrong">Wrong Answers: <span>{wrongAnswers}</span></p>
                <p className="score-detail skipped">Skipped Questions: <span>{skippedAnswers}</span></p>
            </div>
            <button className="btn btn-primary restart-btn" onClick={startQuiz}>
                Restart Quiz
            </button>
        </div>
    );
};

export default Score;
