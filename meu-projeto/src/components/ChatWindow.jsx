import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import { supabase } from '../supabase';

const ChatWindow = ({ activeConversation, messages, loading, fetchMessages }) => {
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [agentChecked, setAgentChecked] = useState(true);
  const messagesEndRef = useRef(null);

  // Obtém nome do usuário autenticado
  useEffect(() => {
    const fetchUserName = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('attendants')
          .select('name')
          .eq('id_users', user.id)
          .single();
        if (!error && data) {
          setUserName(data.name);
        }
      }
    };
    fetchUserName();
  }, []);

  // Quando conversa muda, verifica agent_human da última mensagem human
  useEffect(() => {
    const checkAgentStatus = async () => {
      if (!activeConversation?.conv_id) return;
      const { data, error } = await supabase
        .from('messages')
        .select('agent_human')
        .eq('conversation_id', activeConversation.conv_id)
        .eq('sender_type', 'human')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) {
        console.error('Erro ao buscar agent_human:', error);
        return;
      }
      // Regra: se FALSE -> checkbox true, se TRUE -> checkbox false, sem row -> true
      if (!data) {
        setAgentChecked(true);
      } else {
        setAgentChecked(data.agent_human === false);
      }
    };
    checkAgentStatus();
  }, [activeConversation]);

  const handleAgentToggle = async (e) => {
    const checked = e.target.checked;
    setAgentChecked(checked);
    if (!activeConversation?.conv_id) return;
    // Busca a ultima mensagem human
    const { data, error } = await supabase
      .from('messages')
      .select('id')
      .eq('conversation_id', activeConversation.conv_id)
      .eq('sender_type', 'human')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.error('Erro ao localizar mensagem para atualizar agent_human:', error);
      return;
    }
    if (data) {
      const { error: updError } = await supabase
        .from('messages')
        .update({ agent_human: false })
        .eq('id', data.id);
      if (updError) {
        console.error('Erro ao atualizar agent_human para FALSE:', updError);
      }
    }
  };

  // Rolagem automática quando novas mensagens são carregadas (instantâneo, sem animação)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  // Marca a conversa como lida quando ela é aberta
  useEffect(() => {
    if (activeConversation?.conv_id) {
      markConversationAsRead(activeConversation.conv_id);
    }
  }, [activeConversation]);

  const markConversationAsRead = async (conversationId) => {
    try {
      await supabase.rpc('mark_conversation_as_read', { conversation_id_param: conversationId });
    } catch (error) {
      console.error('Erro ao marcar conversa como lida:', error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    try {
      const { error } = await supabase.from('messages').insert({
        conversation_id: activeConversation.conv_id,
        sender_type: 'human',
        agent_human: true,
        content: newMessage.trim(),
        name: userName || 'Você',
      });

      if (error) throw error;

      // Atualiza a hora da última mensagem e incrementa contador não lido
      await supabase
        .from('conversations')
        .update({ 
          last_message_at: new Date().toISOString() 
        })
        .eq('id', activeConversation.conv_id);

      setNewMessage('');
      setAgentChecked(false);
      fetchMessages(activeConversation.conv_id);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 p-4">
        <p className="text-gray-400 text-center">
          Selecione uma conversa para começar
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex-1 flex flex-col bg-gray-900 h-full">
        <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">{activeConversation.conv_name}</h2>
          <label className="flex items-center gap-2 text-xl text-white">
            <input type="checkbox" className="form-checkbox text-primary w-5 h-5" checked={agentChecked} onChange={handleAgentToggle} />
            Ativar Agente
          </label>
        </div>
        <div className="flex-1 p-4">
          <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-10 bg-gray-700 rounded w-3/4"></div>
            <div className="h-10 bg-gray-700 rounded w-1/2 self-end"></div>
            <div className="h-10 bg-gray-700 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900 h-full">
      <div className="p-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
        <h2 className="text-xl font-bold text-white">{activeConversation.conv_name}</h2>
        <label className="flex items-center gap-2 text-xl text-white">
          <input type="checkbox" className="form-checkbox text-primary w-5 h-5" checked={agentChecked} onChange={handleAgentToggle} />
          Ativar Agente
        </label>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-gray-400">Nenhuma mensagem ainda</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-2 rounded-l-md bg-gray-700 text-white outline-none"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
