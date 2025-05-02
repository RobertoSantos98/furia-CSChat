import quizData from '../data/quizQuestion.json';
import { Message } from '../types/message';

let currentQuestionIndex = 0;
let isAwaitingAnswer = false;

export const quizStrategy = (msg?: string): Message => {
  if (!isAwaitingAnswer) {
    isAwaitingAnswer = true;
    return {
      sender: 'bot',
      text: quizData[currentQuestionIndex].question + "\n" + quizData[currentQuestionIndex].options
    };
  }

  const currentQuestion = quizData[currentQuestionIndex];
  const correct = msg?.toLowerCase() === currentQuestion.answer.toLowerCase();

  let responseText = correct
    ? 'Resposta correta! 🎉'
    : `Errado! 😢 A resposta certa era: ${currentQuestion.answer}`;

  currentQuestionIndex++;
  if (currentQuestionIndex >= quizData.length) {
    currentQuestionIndex = 0;
    isAwaitingAnswer = false;
    responseText += '\n\nFim do quiz! Digite "quiz" para recomeçar.';
  } else {
    responseText += `\n\nPróxima pergunta:\n${quizData[currentQuestionIndex].question}`;
  }

  return {
    sender: 'bot',
    text: responseText
  };
};
