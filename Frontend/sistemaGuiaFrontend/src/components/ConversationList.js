import React, { useState } from 'react';

const ConversationList = ({ conversations, selectConversation }) => {
  return (
    <div>
      <h2 style={styles.heading}>Conversaciones</h2>
      <ul style={styles.list}>
        {conversations.map((conversation) => (
          <li key={conversation.id} style={styles.listItem}>
            <button
              onClick={() => selectConversation(conversation.idChat)}
              style={styles.button}
            >
              {conversation.nombre}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '8px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConversationList;
