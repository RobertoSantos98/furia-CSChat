import quizData from '../data/quizQuestion.json';
import { Message } from '../types/message';

let currentQuestionIndex = 0;
let isAwaitingAnswer = false;

export const quizStrategy = (msg?: string): Message => {
  const currentQuestion = quizData[currentQuestionIndex];

  // Se ainda não fez a pergunta
  if (!isAwaitingAnswer || !msg) {
    isAwaitingAnswer = true;

    const optionsText = currentQuestion.options
      .map((opt: string, i: number) => `${String.fromCharCode(65 + i)}) ${opt}`)
      .join('\n');

    return {
      sender: 'bot',
      text: `Pergunta ${currentQuestionIndex + 1}:\n${currentQuestion.question}\n\n${optionsText}`
    };
  }

  const userInput = msg.trim().toLowerCase();
  const correctAnswer = currentQuestion.answer.toLowerCase();

  let responseText = '';

  if (userInput === correctAnswer) {
    responseText = '✅ Resposta correta!';
  } else {
    const correctIndex = correctAnswer.charCodeAt(0) - 97; // 'a' = 97
    const correctLetter = String.fromCharCode(65 + correctIndex); // A, B, C...
    const correctOption = currentQuestion.options[correctIndex];

    responseText = `❌ Resposta errada. A resposta certa era: ${correctLetter}) ${correctOption}`;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex >= quizData.length) {
    responseText += '\n\n🎉 Fim do quiz! Digite "quiz" para jogar novamente.';
    currentQuestionIndex = 0;
    isAwaitingAnswer = false;
  } else {
    const nextQuestion = quizData[currentQuestionIndex];
    const nextOptions = nextQuestion.options
      .map((opt: string, i: number) => `${String.fromCharCode(65 + i)}) ${opt}`)
      .join('\n');

    responseText += `\n\nPróxima pergunta:\n${nextQuestion.question}\n\n${nextOptions}`;
  }

  return {
    sender: 'bot',
    text: responseText
  };
};
