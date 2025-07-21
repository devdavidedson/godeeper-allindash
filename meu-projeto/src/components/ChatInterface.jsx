import React, { useState, useEffect } from 'react';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import { supabase } from '../supabase';

const ChatInterface = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // Carregar conversas quando o componente é montado
  useEffect(() => {
    fetchConversations();
    
    // Inscrever-se para atualizações em tempo real nas conversas
    const conversationsSubscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'conversations' 
          }, 
          () => {
            fetchConversations();
          }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(conversationsSubscription);
    };
  }, []);

  // Carregar mensagens quando uma conversa é selecionada
  useEffect(() => {
    if (activeConversation) {
      fetchMessages(activeConversation.conv_id);
      
      // Inscrever-se para atualizações em tempo real nas mensagens da conversa ativa
      const messagesSubscription = supabase
        .channel(`messages-${activeConversation.conv_id}`)
        .on('postgres_changes', 
            {
              event: 'INSERT',
              schema: 'public',
              table: 'messages',
              filter: `conversation_id=eq.${activeConversation.conv_id}`
            }, 
            (payload) => {
              setMessages(current => [...current, payload.new]);
            }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(messagesSubscription);
      };
    }
  }, [activeConversation]);

  // Busca todas as conversas usando a função RPC do Supabase
  const fetchConversations = async () => {
    setLoadingConversations(true);
    try {
      const { data, error } = await supabase.rpc('get_user_conversations');
      
      if (error) throw error;
      
      setConversations(data || []);
      
      // Se tiver uma conversa ativa, atualiza seus dados
      if (activeConversation) {
        const updatedConversation = data.find(conv => conv.conv_id === activeConversation.conv_id);
        if (updatedConversation) {
          setActiveConversation(updatedConversation);
        }
      }
    } catch (error) {
      console.error('Erro ao buscar conversas:', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  // Busca mensagens de uma conversa específica
  const fetchMessages = async (conversationId) => {
    if (!conversationId) return;
    
    setLoadingMessages(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error) {
      console.error('Erro ao buscar mensagens:', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handler para selecionar uma conversa
  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ChatSidebar 
        conversations={conversations}
        activeConversation={activeConversation}
        setActiveConversation={handleSelectConversation}
        loading={loadingConversations}
      />
      
      <ChatWindow 
        activeConversation={activeConversation}
        messages={messages}
        loading={loadingMessages}
        fetchMessages={fetchMessages}
      />
    </div>
  );
};

export default ChatInterface;
