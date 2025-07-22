import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ChatSidebar = ({ conversations, activeConversation, setActiveConversation, loading }) => {
  if (loading) {
    return (
      <div className="w-1/4 bg-surface border-r border-surface h-full overflow-y-auto">
        <div className="p-4 border-b border-surface">
          <h2 className="text-xl font-bold text-text-primary">Conversas</h2>
        </div>
        <div className="p-4 text-text-secondary">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-700 rounded-md mb-3"></div>
            <div className="h-12 bg-gray-700 rounded-md mb-3"></div>
            <div className="h-12 bg-gray-700 rounded-md mb-3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-1/4 bg-surface border-r border-surface h-full overflow-y-auto">
      <div className="p-4 border-b border-surface">
        <h2 className="text-xl font-bold text-text-primary">Conversas</h2>
      </div>
      <div>
        {conversations.length === 0 ? (
          <div className="p-4 text-text-secondary">
            Nenhuma conversa encontrada.
          </div>
        ) : (
          conversations.map((conversation) => (
            <div
              key={conversation.conv_id}
              className={`p-4 border-b border-surface cursor-pointer transition-colors ${
                activeConversation?.conv_id === conversation.conv_id
                  ? 'bg-secondary hover:opacity-90'
                  : 'hover:bg-surface'
              }`}
              onClick={() => setActiveConversation(conversation)}
            >
              <div className="flex justify-between items-start">
                <div className="text-text-primary font-medium">{conversation.conv_name}</div>
                <div className="text-xs text-accent">
                  {formatDistanceToNow(new Date(conversation.last_message_time), { 
                    addSuffix: true,
                    locale: ptBR
                  })}
                </div>
              </div>
              <div className="flex items-start mt-1">
                <div className="text-sm text-text-secondary truncate max-w-[90%]">
                  {conversation.last_message}
                </div>
                {conversation.unread_count > 0 && (
                  <div className="ml-auto bg-green-500 text-text-primary text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {conversation.unread_count}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
