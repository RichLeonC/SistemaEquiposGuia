const Estudiante = require('../Modelos/Estudiante.js');
const EstudianteDAO = require("../DAO/EstudianteDAO.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.


const estudianteDAO = new EstudianteDAO();



//GET -> localhost:4000/estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await estudianteDAO.getAllEstudiantes();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los estudiantes");
  }

});


//POST ->localhost:4000/estudiantes
router.post('/', async (req, res) => {
  try {
    const { cedulaUsuario, nombre, segundonombre, apellido1, apellido2, correo, clave, celular, idSede, codigoCarrera,generacion,carne} = req.body;

    // Validamos los datos de entrada
    if (!cedulaUsuario || !nombre || !apellido1 || !apellido2 || !correo || !clave || !celular
      || !idSede ||!codigoCarrera||!generacion) {
      return res.status(400).send('Todos los campos son obligatorios, excepto segundoNombre.');
    }

    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(clave, salt);


    const nuevoEstudiante = new Estudiante(cedulaUsuario, nombre, segundonombre, apellido1, apellido2, correo,
      claveEncriptada, celular, "ESTUDIANTE",carne,codigoCarrera,idSede, generacion);
    await estudianteDAO.crearEstudiante(nuevoEstudiante);

    return res.status(201).send('Estudiante creado exitosamente.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al crear el Estudiante.');
  }
});
module.exports = router;
