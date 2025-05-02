import { gameStrategy } from './gameStrategy';
import { curiosityStrategy } from './curiosityStrategy';
import { quizStrategy } from './quizStrategy';
import { upcomingGamesStrategy } from './upComingGameStrategy';
import { playersStrategy } from './playersStrategy';

import { Message } from '../types/message';

let currentState: 'menu' | 'quiz' | 'game' | 'curiosity'| 'agenda' | 'waitingAnswer' = 'menu';

export const getBotResponse = (msg: string): Message => {
  const lowerMsg = msg.toLowerCase();

  if (lowerMsg.includes('voltar')) {
    currentState = 'menu';
    return {
      sender: 'bot',
      text: 'Ok! Voltamos ao menu principal. Você quer saber sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida?'
    };
  }

  // Estados com sequência de "mais"
  if (currentState === 'quiz') {
    const response = quizStrategy(msg);
    if (response.text.includes('Fim') || response.text.includes('Desisto')) {
      currentState = 'menu';
    }
    return response;
  }

  if (currentState === 'curiosity') {
    return curiosityStrategy(msg);
  }

  if (currentState === 'game') {
    return gameStrategy(msg);
  }

  if (currentState === 'agenda') {
    return upcomingGamesStrategy(msg); 
  }

  if (lowerMsg.includes('quiz')) {
    currentState = 'quiz';
    return quizStrategy(); 
  }

  if (lowerMsg.includes('jogo passado') || lowerMsg.includes('partida')) {
    currentState = 'game';
    return gameStrategy();
  }

  if (lowerMsg.includes('jogo futuro') || lowerMsg.includes('agenda') || lowerMsg.includes('próximo')) {
    currentState = 'agenda';
    return upcomingGamesStrategy();
  }

  if (lowerMsg.includes('curiosidade')) {
    currentState = 'curiosity';
    return curiosityStrategy();
  }

  if (lowerMsg.includes('jogadores') || lowerMsg.includes('time')) {
    return playersStrategy();
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Você pode perguntar sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida.'
  };
};

