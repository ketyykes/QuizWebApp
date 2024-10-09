"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizResultsProps {
  questions: {
    question: string;
    options: string[];
    correctOptionIndex: number;
  }[];
  userAnswers: number[];
  onRestart: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  questions,
  userAnswers,
  onRestart,
}) => {
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === questions[index].correctOptionIndex
  ).length;

  const score = (correctAnswers / questions.length) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">
            Your Score: {score.toFixed(2)}%
          </p>
          <p className="mb-4">
            Correct Answers: {correctAnswers} out of {questions.length}
          </p>
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={index} className="border p-4 rounded">
                <p className="font-semibold">{question.question}</p>
                <p className="text-green-600">
                  Correct Answer: {question.options[question.correctOptionIndex]}
                </p>
                <p className={userAnswers[index] === question.correctOptionIndex ? 'text-green-600' : 'text-red-600'}>
                  Your Answer: {question.options[userAnswers[index]]}
                </p>
              </div>
            ))}
          </div>
          <Button onClick={onRestart} className="mt-4">
            Restart Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};