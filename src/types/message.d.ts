export interface Message {
    sender: 'user' | 'bot';
    text: string;
  }

  export type ChatState = 'menu' | 'game' | 'curiosity' | 'quiz' | 'waitingAnswer';

  