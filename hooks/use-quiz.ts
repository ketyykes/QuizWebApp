"use client";

import { useState, useEffect } from 'react';

interface Question {
  question: string;
  options: string[];
  correctOptionIndex: number;
}

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    if (questions.length > 0 && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleAnswer(-1); // -1 indicates time's up
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [questions, currentQuestionIndex, quizCompleted]);

  const loadQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setTimeRemaining(30);
  };

  const handleAnswer = (answerIndex: number) => {
    setUserAnswers([...userAnswers, answerIndex]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimeRemaining(30);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizCompleted(false);
    setTimeRemaining(30);
  };

  return {
    questions,
    currentQuestionIndex,
    userAnswers,
    quizCompleted,
    timeRemaining,
    loadQuestions,
    answerQuestion: handleAnswer,
    restartQuiz,
  };
};