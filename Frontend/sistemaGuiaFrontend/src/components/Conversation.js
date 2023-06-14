import React, { useState } from 'react';
const Conversation = ({ messages, sendMessage }) => {
    const [newMessage, setNewMessage] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      sendMessage(newMessage);
      setNewMessage('');
    };
  
    return (
      <div>
        <h2>Conversación</h2>
        <div>
          {messages.map((message) => (
            <div key={message.id}>
              <strong>{message.sender}</strong>: {message.content}
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Escribe tu mensaje"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  };
  
  export default Conversation;