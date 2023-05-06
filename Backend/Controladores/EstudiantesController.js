const Estudiante = require('../Modelos/Estudiante.js');
const EstudianteDAO = require("../DAO/EstudianteDAO.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const estudianteDAO = new estudianteDAO();



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

//GET -> localhost:4000/estudiantes/:carne (estudiantes/2020127158, por ejemplo)
router.get('/:carne', async (req, res) => {
  try {
    const { carne } = req.params;
    const estudiante = await estudianteDAO.getUsuario(carne);
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener al estudiante por canre");
  }

});


//GET -> localhost:4000/estudiantes/:sede (estudiantes/Cartago, por ejemplo)
router.get('/:sede', async (req, res) => {
  try {
    const { sede } = req.params;
    const estudiante = await usuarioDAO.getUsuario(sede);
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener a los estudiantes por sede");
  }

});


//GET -> localhost:4000/estudiantes/:editar (estudiantes/Cartago, por ejemplo)
router.get('/:sede', async (req, res) => {
  try {
    const { sede } = req.params;
    const estudiante = await usuarioDAO.getUsuario(sede);
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener a los estudiantes por sede");
  }

});


//PUT ->localhost:4000/usuarios/:sede/:carnet (usuarios/Cartago/2020127158, por ejemplo)
router.put('/:cedula/:rolNuevo', async (req, res) => {
  try {

    const { cedula, rolNuevo } = req.params;
    console.log(rolNuevo);
    if (!cedula || !rolNuevo) {
      return res.status(400).send('Campos invalidos');
    }
    else if (rolNuevo != Rol.PROFESOR_GUIA || rolNuevo != Rol.PROFESOR_GUIA_COORDINADOR || rolNuevo != Rol.ASISTENTE ||
      rolNuevo != Rol.ESTUDIANTE) {
      return res.status(400).send('Rol invalido');
    }

    await UsuarioDAO.actualizarRol(cedula, rolNuevo);

    res.status(200).send('Rol actualizado exitosamente');
  } catch (error) {
    res.status(500).send('Error al actualizar el rol del usuario');
  }
});



module.exports = router;
