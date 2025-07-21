import React from 'react';
import { formatRelative } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ChatMessage = ({ message }) => {
  const messageTime = new Date(message.created_at);
  const isLead = message.sender_type === 'lead';
  const isAgent = message.sender_type === 'agent';
  const isHuman = message.sender_type === 'human';
  
  // Definir alinhamento com base no tipo de remetente
  const alignment = isLead ? 'justify-start' : 'justify-end';
  
  // Definir a cor de fundo com base no tipo de remetente
  let bgColorClass = '';
  let textColorClass = 'text-white';
  let timeColorClass = '';
  
  if (isLead) {
    bgColorClass = 'bg-gray-700'; // Lead: cinza escuro
    timeColorClass = 'text-gray-400';
  } else if (isAgent) {
    bgColorClass = 'bg-blue-600'; // Agent: azul
    timeColorClass = 'text-blue-200';
  } else if (isHuman) {
    bgColorClass = 'bg-green-600'; // Human: verde
    timeColorClass = 'text-green-200';
  }

  return (
    <div className={`flex ${alignment} mb-4`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${bgColorClass} ${textColorClass}`}
      >
        {message.name && (
          <div className="text-xs font-medium mb-1">
            {isLead && <span className="text-yellow-300">{message.name}</span>}
            {isAgent && <span className="text-blue-300">{message.name}</span>}
            {isHuman && <span className="text-green-300">{message.name}</span>}
          </div>
        )}
        <div className="break-words">{message.content}</div>
        <div className={`text-xs mt-1 ${timeColorClass}`}>
          {formatRelative(messageTime, new Date(), { locale: ptBR })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
