import React from 'react';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ChatMessage = ({ message, isCurrentUser }) => {
  const messageTime = new Date(message.created_at);

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isCurrentUser 
            ? 'bg-green-600 text-white' 
            : 'bg-gray-700 text-white'
        }`}
      >
        {!isCurrentUser && message.name && (
          <div className="text-xs font-medium text-green-300 mb-1">
            {message.name}
          </div>
        )}
        <div className="break-words">{message.content}</div>
        <div className={`text-xs mt-1 ${isCurrentUser ? 'text-green-200' : 'text-gray-400'}`}>
          {formatRelative(messageTime, new Date(), { locale: ptBR })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
