import { Message } from '../types/message';
import games from '../data/games.json';

let currentGameIndex = 0;
let isShowingGame = false;

export const gameStrategy = (msg?: string): Message => {
  if (!isShowingGame || !msg) {
    isShowingGame = true;
    currentGameIndex = 0;

    const game = games[currentGameIndex];

    return {
      sender: 'bot',
      text: `🎮 *${game.title}*\n${game.text}\n\n.`
    };
  }

  const input = msg.trim().toLowerCase();

  if (input.includes('mais') || input.includes('+')) {
    currentGameIndex++;

    if (currentGameIndex >= games.length) {
      currentGameIndex = 0;
    }

    const game = games[currentGameIndex];

    return {
      sender: 'bot',
      text: `🎮 *${game.title}*\n${game.text}\n\nDigite "mais" para outro jogo histórico ou "voltar" para o menu.`
    };
  }

  if (input === 'voltar') {
    isShowingGame = false;
    currentGameIndex = 0;

    return {
      sender: 'bot',
      text: 'Voltamos ao menu principal. O que deseja explorar? Digite "quiz", "curiosidade", "perfil" ou "sair".'
    };
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Digite "mais" para outro jogo histórico ou "voltar" para o menu.'
  };
};
