import { Message } from '../types/message';

export const curiosityStrategy = (): Message => ({
  sender: 'bot',
  text: 'Você sabia que a FURIA foi fundada em 2017 e é uma das principais organizações de esports do Brasil? Quer saber mais ou voltar ao menu? Digite "mais" ou "voltar".'
});