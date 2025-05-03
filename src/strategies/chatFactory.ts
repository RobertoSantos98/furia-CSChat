import { gameStrategy } from './gameStrategy';
import { curiosityStrategy } from './curiosityStrategy';
import { quizStrategy } from './quizStrategy';
import { upcomingGamesStrategy } from './upComingGameStrategy';
import { playersStrategy } from './playersStrategy';

import { Message } from '../types/message';

let currentState: 'menu' | 'quiz' | 'jogos' | 'curiosity' | 'agenda' | 'players' = 'menu';

export const getBotResponse = (msg: string): Message => {
  const lowerMsg = msg.toLowerCase();

  if (lowerMsg.includes('voltar')) {
    currentState = 'menu';
    return {
      sender: 'bot',
      text: 'Ok! Voltamos ao menu principal. Você quer saber sobre: jogos, curiosidades, quiz, agenda, jogadores?'
    };
  }

  if (currentState === 'quiz') {
    const response = quizStrategy(msg);
    if (response.text.includes('Fim') || response.text.includes('Desisto') || response.text.includes('Não sei')) {
      currentState = 'menu';
    }
    return response;
  }

  if (currentState === 'curiosity') {
    return curiosityStrategy(msg);
  }

  if (currentState === 'jogos') {
    return gameStrategy(msg);
  }

  if (currentState === 'agenda') {
    return upcomingGamesStrategy(msg);
  }

  if (currentState === 'players') {
    return playersStrategy(msg);
  }

  if (lowerMsg.includes('quiz') || lowerMsg.includes('perguntas') || lowerMsg.includes('teste') ){
    currentState = 'quiz';
    return quizStrategy(); 
  }

  if (
    lowerMsg.includes('jogo passado') ||
    lowerMsg.includes('partida') ||
    lowerMsg.includes('histórico') ||
    (lowerMsg.includes('jogos') && !lowerMsg.includes('próximo'))
  ) {
    currentState = 'jogos';
    return gameStrategy();
  }

  if (
    lowerMsg.includes('jogo futuro') ||
    lowerMsg.includes('agenda') ||
    lowerMsg.includes('próximo') ||
    lowerMsg.includes('próximos') ||
    lowerMsg.includes('futuro')
  ) {
    currentState = 'agenda';
    return upcomingGamesStrategy();
  }

  if (lowerMsg.includes('curiosidade') || lowerMsg.includes('curiosidades')) {
    currentState = 'curiosity';
    return curiosityStrategy();
  }

  if (lowerMsg.includes('jogadores') || lowerMsg.includes('time')) {
    currentState = 'players';
    return playersStrategy();
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Você pode perguntar sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida.'
  };
};
