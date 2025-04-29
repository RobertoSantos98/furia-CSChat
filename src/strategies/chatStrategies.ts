import { Message } from '../types/message';

// Respostas simples (não precisam do argumento `msg`)
export const gameStrategy = (): Message => ({
  sender: 'bot',
  text: 'O próximo jogo é contra a NAVI, dia 26 às 15h! Quer saber mais sobre a FURIA ou voltar ao menu? Digite "mais" ou "voltar".'
});

export const curiosityStrategy = (): Message => ({
  sender: 'bot',
  text: 'Você sabia que a FURIA foi fundada em 2017 e é uma das principais organizações de esports do Brasil? Quer saber mais ou voltar ao menu? Digite "mais" ou "voltar".'
});

export const quizStrategy = (): Message => ({
  sender: 'bot',
  text: 'Vamos começar o quiz! Em que ano a FURIA foi fundada? a) 2015 b) 2017 c) 2019. Digite sua resposta ou "voltar" para retornar ao menu.'
});

export const defaultStrategy = (): Message => ({
  sender: 'bot',
  text: 'Não entendi muito bem... Tente perguntar sobre jogos, curiosidades ou quiz! Se quiser voltar ao menu, digite "voltar".'
});

// Resposta do quiz, precisa do argumento `msg`
export const handleQuizResponse = (msg: string): Message => {
  const correctAnswer = '2017'; // Resposta correta do quiz
  if (msg === correctAnswer) {
    return {
      sender: 'bot',
      text: 'Correto! A FURIA foi fundada em 2017. Quer continuar o quiz ou voltar ao menu? Digite "continuar" ou "voltar".'
    };
  } else {
    return {
      sender: 'bot',
      text: 'Resposta errada! A resposta correta é 2017. Quer tentar novamente ou voltar ao menu? Digite "tentar novamente" ou "voltar".'
    };
  }
};
