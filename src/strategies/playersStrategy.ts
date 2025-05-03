import { Message } from '../types/message';
import players from '../data/player.json';

let currentPlayerIndex = 0;
let isShowingPlayers = false;

export const playersStrategy = (msg?: string): Message => {
  if (!isShowingPlayers || !msg) {
    isShowingPlayers = true;
    currentPlayerIndex = 0;

    const player = players[currentPlayerIndex];
    return {
      sender: 'bot',
      text: `👤 *${player.title}*\n${player.text}\n\nDigite "mais" para outro jogador ou "voltar" para o menu.`
    };
  }

  const input = msg.trim().toLowerCase();

  if (input.includes('mais') || input.includes('+') || input.includes('próximo')|| input.includes("outro")){
    currentPlayerIndex++;

    if (currentPlayerIndex >= players.length) {
      currentPlayerIndex = 0;
    }

    const player = players[currentPlayerIndex];
    return {
      sender: 'bot',
      text: `👤 *${player.title}*\n${player.text}\n\nDigite "mais" para outro jogador ou "voltar" para o menu.`
    };
  }

  if (input === 'voltar') {
    isShowingPlayers = false;
    currentPlayerIndex = 0;

    return {
      sender: 'bot',
      text: 'Voltando ao menu principal. Você quer saber sobre: jogos, curiosidades, quiz, agenda, jogadores ou torcida?'
    };
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Digite "mais" para outro jogador ou "voltar" para o menu.'
  };
};
