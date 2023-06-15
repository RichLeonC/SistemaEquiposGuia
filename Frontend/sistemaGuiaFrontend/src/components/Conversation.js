import React, { useState } from 'react';
import axios from "axios";
const Conversation = ({messages, idChat}) => {
    const [newMessage, setNewMessage] = useState({
      idChat: idChat,
      idParticipante: localStorage.getItem("cedula"),
      mensaje: ''
    });
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        console.log("Mensaje", newMessage)
        await axios.post('http://localhost:4000/chat/mensaje', newMessage);
      } catch (err) {
        console.error(err);
      }

    };
  
    return (
      <div>
        <h2>Conversación</h2>
        <div>
        {messages.map((mensaje) => (
        <div key={mensaje.idMensaje} className="comment">
          <p className="comment-author">{mensaje.idParticipante}</p>
          <p className="comment-message">{mensaje.mensaje}</p>
        </div>
      ))}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newMessage.mensaje}
            onChange={(e) => setNewMessage({...newMessage, mensaje: e.target.value})}
            placeholder="Escribe tu mensaje"
          />
          <button type="submit">Enviar</button>
        </form>
      </div>
    );
  };
  
  export default Conversation;