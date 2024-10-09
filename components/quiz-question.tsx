"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface QuizQuestionProps {
  question: {
    question: string;
    options: string[];
    correctOptionIndex: number;
  };
  onAnswer: (answerIndex: number) => void;
  timeRemaining: number;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  timeRemaining,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [question]);

  const handleAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
      setIsAnswered(true);
      onAnswer(index);
    }
  };

  const getButtonClass = (index: number) => {
    if (!isAnswered) return '';
    if (index === question.correctOptionIndex) return 'bg-green-500 hover:bg-green-600';
    if (index === selectedAnswer) return 'bg-red-500 hover:bg-red-600';
    return '';
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-bold mb-4">{question.question}</h2>
        <Progress value={(timeRemaining / 30) * 100} className="mb-4" />
        <div className="grid gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswered}
              className={`${getButtonClass(index)} justify-start h-auto whitespace-normal`}
            >
              {option}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};