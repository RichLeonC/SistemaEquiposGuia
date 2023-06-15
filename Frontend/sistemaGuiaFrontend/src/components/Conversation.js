import React, { useState } from 'react';
import axios from "axios";

const Conversation = ({ messages, idChat, nombre }) => {
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
    <div style={styles.container}>
      <h2 style={styles.heading}>Conversación</h2>
      <div style={styles.messageContainer}>
        {messages.map((mensaje) => (
          <div key={mensaje.idMensaje} style={styles.comment}>
            <p style={styles.author}>{mensaje.idParticipante}</p>
            <p style={styles.message}>{mensaje.mensaje}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={newMessage.mensaje}
          onChange={(e) => setNewMessage({ ...newMessage, mensaje: e.target.value })}
          placeholder="Escribe tu mensaje"
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Enviar</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#f5f5f5',
    borderRadius: '4px',
    padding: '16px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  messageContainer: {
    maxHeight: '400px',
    overflowY: 'auto',
    marginBottom: '16px',
  },
  comment: {
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    marginBottom: '8px',
  },
  author: {
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  message: {
    marginBottom: 0,
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: '1',
    marginRight: '8px',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
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

export default Conversation;
