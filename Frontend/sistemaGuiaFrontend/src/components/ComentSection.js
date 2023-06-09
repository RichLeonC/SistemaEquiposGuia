import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentSection = ({ idActividad }) => {
  const [comments, setComments] = useState([]);
  const [profesorActual, setProfesorActual] = useState([]);
  const apiURIProfesores = "http://localhost:4000/profesores";

  const peticionGetProfesorActual = async () => {
    try {
        const response = await axios.get(apiURIProfesores + "/" + localStorage.getItem("cedula"));
        //setProfesorActual(response.data);
        //console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error);
    }
  }

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
    peticionGetProfesorActual();
  }, [idActividad]);

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  return (
<div style={{ marginTop: '20px' }}>
  <h2 style={{ marginBottom: '10px' }}>Comentarios</h2>
  <CommentForm
    onCommentSubmit={handleCommentSubmit}
    idActividad={idActividad}
  />
  <CommentList comentarios={comments} style={{ marginTop: '20px' }} />
</div>

  );
};

export default CommentSection;
