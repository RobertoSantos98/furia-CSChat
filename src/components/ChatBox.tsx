import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/message';
import { gameStrategy, curiosityStrategy, quizStrategy, defaultStrategy, handleQuizResponse } from '../strategies/chatStrategies';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Oi! Sou o bot da FURIA. Quer saber sobre o time, curiosidades ou fazer um quiz?'
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [chatState, setChatState] = useState<'menu' | 'quiz' | 'game' | 'curiosity' | 'waitingAnswer'>('menu'); // Controla o estado do chat
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = { sender: 'user', text: input };
    const botResponse: Message = getBotResponse(input);

    setMessages((prevMessages) => [...prevMessages, userMessage, botResponse]);
    setInput('');
  };

  const getBotResponse = (msg: string): Message => {
    msg = msg.toLowerCase();

 
    if (chatState === 'waitingAnswer') {
      return handleQuizResponse(msg);
    }

    if (chatState === 'menu') {
      if (msg.includes('jogo') || msg.includes('partida')) {
        setChatState('game');
        return gameStrategy();
      }
      if (msg.includes('curiosidade')) {
        setChatState('curiosity');
        return curiosityStrategy();
      }
      if (msg.includes('quiz')) {
        setChatState('quiz');
        return quizStrategy();
      }
      return defaultStrategy();
    }

    if (msg.includes('voltar')) {
      setChatState('menu');
      return {
        sender: 'bot',
        text: 'Ok! Vamos voltar ao menu principal. O que você gostaria de saber? Jogos, curiosidades ou quiz?'
      };
    }

    if (msg.includes('mais') || msg.includes('continuar')) {
      if (chatState === 'game') {
        return gameStrategy();
      }
      if (chatState === 'curiosity') {
        return curiosityStrategy();
      }
      if (chatState === 'quiz') {
        setChatState('waitingAnswer');
        return quizStrategy();
      }
    }

    return defaultStrategy();
  };

  return (
    <div className="chat-box">
      <div className="chat-history">
        {messages.map((msg, index) => (
          <div key={index} className={`message-container ${msg.sender === 'user' ? 'user' : 'bot'}`}>
            <div className={`message-bubble ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBox;
