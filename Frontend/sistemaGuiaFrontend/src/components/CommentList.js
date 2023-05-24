import React from 'react';

const CommentList = ({ comentarios }) => {
  return (
    <div>
      <h3>Comentarios</h3>
      {comentarios.map((comentario) => (
        <div key={comentario.idComentario} className="comment">
          <p className="comment-author">{comentario.idProfesor}</p>
          <p className="comment-message">{comentario.mensaje}</p>
        </div>
      ))}
      <style jsx>{`
        .comment {
          background-color: #f5f5f5;
          padding: 10px;
          margin-bottom: 10px;
        }
        .comment-author {
          font-weight: bold;
        }
        .comment-message {
          margin-top: 5px;
        }
      `}</style>
    </div>
  );
};

export default CommentList;
