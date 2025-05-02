import { Message } from '../types/message';
import upcomingGames from '../data/upcomingGames.json';

let currentUpcomingIndex = 0;
let isShowingUpcoming = false;

export const upcomingGamesStrategy = (msg?: string): Message => {
  if (!isShowingUpcoming || !msg) {
    isShowingUpcoming = true;
    currentUpcomingIndex = 0;

    const game = upcomingGames[currentUpcomingIndex];

    return {
      sender: 'bot',
      text: `📅 *${game.title}*\n${game.text}\n\nDigite "mais" para ver outro jogo ou "voltar" para o menu.`
    };
  }

  const input = msg.trim().toLowerCase();

  if (input.includes('mais') || input.includes('+')) {
    currentUpcomingIndex++;

    if (currentUpcomingIndex >= upcomingGames.length) {
      currentUpcomingIndex = 0;
    }

    const game = upcomingGames[currentUpcomingIndex];

    return {
      sender: 'bot',
      text: `📅 *${game.title}*\n${game.text}\n\nDigite "mais" para ver outro jogo ou "voltar" para o menu.`
    };
  }

  if (input === 'voltar') {
    isShowingUpcoming = false;
    currentUpcomingIndex = 0;

    return {
      sender: 'bot',
      text: 'Voltamos ao menu principal. O que deseja explorar? Digite "quiz", "curiosidade", "perfil" ou "sair".'
    };
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Digite "mais" para ver outro jogo ou "voltar" para o menu.'
  };
};
