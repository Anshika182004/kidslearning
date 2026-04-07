import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { quizCategories, quizQuestions } from '../../data/kidsContent';
import styles from './Quiz.module.css';

const QuizContainer = () => {
  const [stage, setStage] = useState('select'); // select | quiz | result
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [score, setScore] = useState(0);

  const startQuiz = (cat) => {
    setSelectedCategory(cat);
    setScore(0);
    setStage('quiz');
  };

  const finishQuiz = (finalScore) => {
    setScore(finalScore);
    setStage('result');
    if (finalScore >= 1) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const reset = () => {
    setStage('select');
    setSelectedCategory(null);
  };

  return (
    <div className={styles.quizPage}>
      <header className={styles.header}>
        <div className="container">
          <h1 className="bubble-font">Quiz Time! 🏆</h1>
          <p>Test your knowledge and win stars! ✨</p>
        </div>
      </header>

      <main className="container">
        <AnimatePresence mode="wait">
          {stage === 'select' && (
            <motion.div 
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={styles.selectionGrid}
            >
              {quizCategories.map((cat) => (
                <button 
                  key={cat.id} 
                  className={styles.catCard}
                  onClick={() => startQuiz(cat.id)}
                >
                  <div className={styles.catIcon}>{cat.icon}</div>
                  <h2 className="bubble-font">{cat.name}</h2>
                </button>
              ))}
            </motion.div>
          )}

          {stage === 'quiz' && (
            <QuizEngine 
              category={selectedCategory} 
              onFinish={finishQuiz} 
            />
          )}

          {stage === 'result' && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.resultBox}
            >
              <h1 className="bubble-font">Great Job! 🎉</h1>
              <div className={styles.scoreCircle}>
                <span>{score}</span>
              </div>
              <p>You earned {score} stars today!</p>
              <button className={styles.btnReset} onClick={reset}>
                Try Another Quiz
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const QuizEngine = ({ category, onFinish }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [points, setPoints] = useState(0);
  const questions = quizQuestions[category] || [];

  const handleAnswer = (correct) => {
    if (correct) setPoints(points + 1);
    
    setTimeout(() => {
      if (currentIdx + 1 < questions.length) {
        setCurrentIdx(currentIdx + 1);
      } else {
        onFinish(points + (correct ? 1 : 0));
      }
    }, 400); // Small delay for feedback
  };

  const q = questions[currentIdx];

  if (!q) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      key={currentIdx}
      className={styles.quizStage}
    >
      <div className={styles.progress}>
        Question {currentIdx + 1} of {questions.length}
      </div>
      
      <div className={styles.qCard}>
        <h2 className={styles.questionText}>{q.question}</h2>
        <div className={styles.optionsGrid}>
          {q.options.map((opt, i) => (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              key={i}
              className={styles.optBtn}
              onClick={() => handleAnswer(opt.correct)}
            >
              {opt.text}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuizContainer;
