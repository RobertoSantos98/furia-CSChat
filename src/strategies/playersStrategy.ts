import { Message } from '../types/message';

export const playersStrategy = (): Message => ({
  sender: 'bot',
  text: `📅 Próximos Jogos:
- 02/05 vs NAVI às 15h (IEM Dallas)
- 05/05 vs Vitality às 13h (IEM Dallas)

⚠️ Horários podem mudar. Fique ligado nas redes da FURIA!`
});
