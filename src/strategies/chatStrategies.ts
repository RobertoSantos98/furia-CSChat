import { gameStrategy } from './gameStrategy';
import { curiosityStrategy } from './curiosityStrategy';
import { quizStrategy } from './quizStrategy';
import { upcomingGamesStrategy } from './upComingGameStrategy';
import { playersStrategy } from './playersStrategy';
import { torcidaStrategy } from './torcidaStrategy';
import { Message } from '../types/message';

let currentState: 'menu' | 'quiz' | 'game' | 'curiosity' | 'waitingAnswer' = 'menu';

export const getBotResponse = (msg: string): Message => {
  const lowerMsg = msg.toLowerCase();

  if (lowerMsg.includes('voltar')) {
    currentState = 'menu';
    return {
      sender: 'bot',
      text: 'Ok! Voltamos ao menu principal. Você quer saber sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida?'
    };
  }


  if (currentState === 'quiz') {
    const response = quizStrategy(msg);
    if (response.text.includes('Fim') || response.text.includes('Desisto')) {
      currentState = 'menu';
    }
    return response;
  }

  if (lowerMsg.includes('quiz')) {
    currentState = 'quiz';
    return quizStrategy(); 
  }

  if (lowerMsg.includes('jogo') || lowerMsg.includes('partida')) {
    currentState = 'game';
    return gameStrategy();
  }

  if (lowerMsg.includes('curiosidade')) {
    currentState = 'curiosity';
    return curiosityStrategy();
  }

  if (lowerMsg.includes('próximos jogos') || lowerMsg.includes('agenda')) {
    return upcomingGamesStrategy();
  }

  if (lowerMsg.includes('jogadores') || lowerMsg.includes('time')) {
    return playersStrategy();
  }

  if (lowerMsg.includes('torcida') || lowerMsg.includes('simular')) {
    return torcidaStrategy();
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Você pode perguntar sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida.'
  };
};
