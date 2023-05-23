import React, { useState } from 'react';
import axios from 'axios';

const CommentForm = ({ idActividad, onCommentSubmit }) => {
  const [comentario, setComentario] = useState({
    idActividad: idActividad,
    idProfesor: 'SJ-02', //el profesor que este loggeado
    mensaje: '',
    fecha: new Date(),
    hora:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Comentario", comentario)
      await axios.post('http://localhost:4000/comentarios', comentario);
      const response = await axios.get(`http://localhost:4000/comentarios/${idActividad}`);
      onCommentSubmit(response.data);
      setComentario({
        idActividad: idActividad,
        idProfesor: 'SJ-02',
        mensaje: '',
        fecha: new Date(),
        hora: ''
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Comentario"
        value={comentario.mensaje}
        onChange={(e) => setComentario({...comentario, mensaje: e.target.value})}
      />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default CommentForm;
