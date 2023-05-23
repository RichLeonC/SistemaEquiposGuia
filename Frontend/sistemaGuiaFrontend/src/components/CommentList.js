import React from 'react';

const CommentList = ({ comentarios }) => {
  return (
    <div>
      <h3>Comentarios</h3>
      {comentarios.map((comentario) => (
        <div key={comentario.idComentario}>
          <p>{comentario.idProfesor}</p>
          <p>{comentario.mensaje}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
