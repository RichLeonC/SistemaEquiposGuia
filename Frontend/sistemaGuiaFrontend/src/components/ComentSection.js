import React, { useState } from 'react';

const CommentSection = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim() === '') return;
    onAddComment(newComment);
    setNewComment('');
  };

  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index}>{comment}</div>
      ))}
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Agregar Comentario</button>
      </div>
    </div>
  );
};

export default CommentSection;