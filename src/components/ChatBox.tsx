import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types/message';
import { getBotResponse } from '../strategies/chatStrategies';

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Oi! Sou o bot da FURIA. Quer saber sobre o time, curiosidades ou fazer um quiz?'
    }
  ]);

  const [input, setInput] = useState<string>('');
 
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
