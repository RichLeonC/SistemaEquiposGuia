import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ idActividad }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
       const response = await axios.get(`http://localhost:4000/comentarios/${idActividad}`);
       setComments(response.data);
       console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchComments();
  }, [idActividad]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
    <div>
      <h2>Comentarios</h2>
      <CommentForm
        onCommentSubmit={handleCommentSubmit}
        idActividad={idActividad}
      />
   <CommentList comentarios={comments} />
    </div>
  );
};

export default CommentSection;
