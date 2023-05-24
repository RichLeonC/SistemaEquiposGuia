import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentForm = ({ idActividad, onCommentSubmit, profesor }) => {

  const apiURIProfesores = "http://localhost:4000/profesores";
  
  const [profesorActual, setProfesorActual] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [comentario, setComentario] = useState({
    idActividad: idActividad,
    idProfesor: '',//localStorage.getItem("cedula"), //el profesor que este loggeado
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
        idProfesor: profesorActual.codigo,
        mensaje: '',
        fecha: new Date(),
        hora: ''
      });
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    
  const peticionGetProfesorActual = async () => {
    try {
        const response = await axios.get(apiURIProfesores + "/" + localStorage.getItem("cedula"));
        setComentario((prevComentario) => ({
          ...prevComentario,
          idProfesor: response.data.codigo
        }));
        
    } catch (error) {
        console.log(error);
    }
  }
    peticionGetProfesorActual();
  }, []);

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      <textarea
        placeholder="Comentario"
        value={comentario.mensaje}
        onChange={(e) => setComentario({...comentario, mensaje: e.target.value})}
        style={{ width: '100%', height: '100px', padding: '10px' }}
      />
      <button type="submit" style={{ marginTop: '10px', padding: '5px 10px', background: '#f1f1f1', border: 'none' }}>
        Enviar
      </button>
    </form>

  );
};

export default CommentForm;
