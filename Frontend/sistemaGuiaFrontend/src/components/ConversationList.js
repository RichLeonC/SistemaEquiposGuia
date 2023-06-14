import React, { useState } from 'react';

const ConversationList = ({ conversations, selectConversation }) => {
  return (
    <div>
      <h2>Conversaciones</h2>
      <ul>
        {conversations.map((conversation) => (
          <li key={conversation.id}>
            <button onClick={() => selectConversation(conversation.idChat)}>
              {conversation.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;