import React from 'react';

interface Props {
  sender: 'user' | 'bot';
  text: string;
}

const MessageBubble: React.FC<Props> = ({ sender, text }) => {
  const bubbleClass = sender === 'user' ? 'user-message' : 'bot-message';

  return (
    <div className="message-container">
      <div className={`message-bubble ${bubbleClass}`}>
        {text}
      </div>
    </div>
  );
};

export default MessageBubble;
