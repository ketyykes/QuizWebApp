"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sidebar } from '@/components/sidebar';
import { QuizQuestion } from '@/components/quiz-question';
import { QuizResults } from '@/components/quiz-results';
import { useQuiz } from '@/hooks/use-quiz';

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    questions, 
    currentQuestionIndex, 
    userAnswers, 
    quizCompleted,
    timeRemaining,
    loadQuestions,
    answerQuestion,
    restartQuiz
  } = useQuiz();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to the Quiz App</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">To start a quiz, please upload a JSON file with questions.</p>
            <Button onClick={toggleSidebar}>Upload Questions</Button>
          </CardContent>
        </Card>
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onUpload={loadQuestions} />
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizResults
        questions={questions}
        userAnswers={userAnswers}
        onRestart={restartQuiz}
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Question {currentQuestionIndex + 1} of {questions.length}</CardTitle>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent>
          <QuizQuestion
            question={currentQuestion}
            onAnswer={answerQuestion}
            timeRemaining={timeRemaining}
          />
        </CardContent>
      </Card>
      <Button className="mt-4" onClick={toggleSidebar}>Upload New Questions</Button>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} onUpload={loadQuestions} />
    </div>
  );
}