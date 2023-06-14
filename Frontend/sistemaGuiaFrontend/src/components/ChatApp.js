import React, { useState } from 'react';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const ChatApp = () => {
    const [conversations, setConversations] = useState([
      {
        id: 1,
        name: 'Conversación 1',
        messages: [
          { id: 1, sender: 'Usuario1', content: 'Hola' },
          { id: 2, sender: 'Usuario2', content: 'Hola, ¿cómo estás?' },
        ],
      },
      {
        id: 2,
        name: 'Conversación 2',
        messages: [
          { id: 1, sender: 'Usuario3', content: '¡Hola a todos!' },
          { id: 2, sender: 'Usuario1', content: 'Hola Usuario3' },
        ],
      },
      {
        id: 3,
        name: 'Conversación 3',
        messages: [],
      },
    ]);
  
    const [selectedConversation, setSelectedConversation] = useState(null);
  
    const selectConversation = (conversationId) => {
      setSelectedConversation(conversationId);
    };
  
    const sendMessage = (messageContent) => {
      const newMessage = {
        id: conversations[selectedConversation - 1].messages.length + 1,
        sender: 'Usuario',
        content: messageContent,
      };
  
      const updatedConversations = [...conversations];
      updatedConversations[selectedConversation - 1].messages.push(newMessage);
  
      setConversations(updatedConversations);
    };

    const createConversation = () => {
        const newConversation = {
          id: conversations.length + 1,
          name: `Conversación ${conversations.length + 1}`,
          messages: [],
        };
    
        setConversations([...conversations, newConversation]);
      };
    
  
    return (
    <DashboardLayout>
      <div>
        <button onClick={createConversation}>Crear nueva conversación</button>
        <ConversationList conversations={conversations} selectConversation={selectConversation} />
        {selectedConversation && (
          <Conversation messages={conversations[selectedConversation - 1].messages} sendMessage={sendMessage} />
        )}
      </div>
      </DashboardLayout>
      
    );
  };
  
  export default ChatApp;