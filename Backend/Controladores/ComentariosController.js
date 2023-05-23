const Actividad_Comentario = require("../Modelos/Actividad_Comentario");

const ComentarioDAO = require("../DAO/ComentarioDAO.js");

const express = require("express");
const router = express.Router();

const comentarioDAO = new ComentarioDAO();


//POST -> Localhost:4000/comentarios
router.post('/', async (req, res) => {
    try {

        const{idActividad, idProfesor, mensaje, fecha, hora} = req.body;
       
        const idComentario = await comentarioDAO.generarCodigoComentario();
        const nuevoComentario = new Actividad_Comentario(
            idActividad,
            idComentario,
            idProfesor,
            mensaje,
            fecha, 
            hora
        );
        console.log(nuevoComentario);
        await comentarioDAO.insertComentario(nuevoComentario);

    } catch(error){
        console.error('Error en get comentarios', error);
        return res.status(500).send('Error al crear el comentario.');
    }

});

//GET -> Localhost:4000/comentarios
router.get('/:idActividad', async (req, res) => {
    try{
        const {idActividad} = req.params;

        console.log(idActividad);

        const comentarios = await comentarioDAO.getComentariosActividad(idActividad);
        console.log(comentarios);
        res.status(200).json(comentarios);
    } catch(error){
        console.error("Error al obtener los comentarios", error);
        res.status(500).json({error: "Error al obtener los comentarios"})
    }
});

module.exports = router;