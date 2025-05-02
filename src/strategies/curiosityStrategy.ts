import { Message } from '../types/message';
import curiosities from '../data/curiosity.json';

let currentCuriosityIndex = 0;
let isShowingCuriosity = false;


export const curiosityStrategy = (msg?: string): Message => {
  
  if (!isShowingCuriosity || !msg) {
    isShowingCuriosity = true;
    currentCuriosityIndex = 0;

    const curiosity = curiosities[currentCuriosityIndex];

    return {
      sender: 'bot',
      text: `🔍 *${curiosity.title}*\n${curiosity.text}\n\nDigite "mais" para outra curiosidade ou "voltar" para o menu.`
    };
  }

  const input = msg.trim().toLowerCase();

  if (input === 'mais' || input ==='+') {
    currentCuriosityIndex++;

    if (currentCuriosityIndex >= curiosities.length) {
      currentCuriosityIndex = 0;
    }

    const curiosity = curiosities[currentCuriosityIndex];

    return {
      sender: 'bot',
      text: `🔍 *${curiosity.title}*\n${curiosity.text}\n\nDigite "mais" para outra curiosidade ou "voltar" para o menu.`
    };
  }

  if (input === 'voltar') {
    isShowingCuriosity = false;
    currentCuriosityIndex = 0;

    return {
      sender: 'bot',
      text: 'Voltando ao menu principal. O que deseja fazer? Digite "quiz", "curiosidade", "perfil" ou "sair".'
    };
  }

  return {
    sender: 'bot',
    text: 'Não entendi. Digite "mais" para outra curiosidade ou "voltar" para o menu.'
  };
};
