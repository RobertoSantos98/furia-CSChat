import { Message } from '../types/message';

export const gameStrategy = (): Message => ({
  sender: 'bot',
  text: 'O próximo jogo é contra a NAVI, dia 26 às 15h! Quer saber mais sobre a FURIA ou voltar ao menu? Digite "mais" ou "voltar".'
});