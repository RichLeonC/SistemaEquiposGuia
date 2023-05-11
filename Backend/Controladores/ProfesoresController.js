const Profesor = require("../Modelos/Profesor.js");
const ProfesorDAO = require("../DAO/ProfesorDAO.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.

const profesorDAO = new ProfesorDAO();

//GET -> localhost:4000/profesores
router.get('/', async (req, res) => {
  try {
    const profesores = await profesorDAO.getAllProfes();
    res.status(200).json(profesores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los profesores");
  }

});

//GET -> localhost:4000/profesores/:cedula
router.get('/:parametro', async (req, res) => {
  try {
    const { parametro } = req.params;
    console.log("p: " + parametro);
    const profesor = await profesorDAO.getProfe(parametro);
    res.status(200).json(profesor);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener el profesor");
  }

});

// POST -> localhost:4000/profesor
router.post('/', async (req, res) => {
  try {
    const { cedula, esCordinador, nombre, segundoNombre, apellido1, apellido2, correo, clave, celular, rol, idSede, telOficina, foto } = req.body;

    // Validamos los datos de entrada
    if (!cedula || !nombre || !apellido1 || !apellido2 || !correo || !clave || !celular || !rol
      || !idSede || !telOficina || !foto) {
      return res.status(400).send('Todos los campos son obligatorios, excepto segundoNombre.');
    }
    const codigo = await profesorDAO.generarCodigoProfesor(idSede);
    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(clave, salt);

    const nuevoProfesor = new Profesor(cedula, codigo, esCordinador, nombre, segundoNombre, apellido1, apellido2, correo,
      claveEncriptada, celular, rol, idSede, telOficina, foto);
    await profesorDAO.crearProfesor(nuevoProfesor);

    return res.status(201).send('Profesor creado exitosamente.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al crear el Profesor.');
  }
});




// PUT -> localhost:4000/profesor/esCordinador
router.put('/esCordinador', async (req, res) => {
  try {

    const { cedula, esCordinador } = req.body;
    if (!cedula || (!esCordinador && esCordinador != 0)) {
      return res.status(400).send('Campos inválidos');
    }

    await profesorDAO.ActualizarBoolCoordinador(cedula, esCordinador);

    return res.status(200).send('Atributo esCoordinador actualizado correctamente');
  } catch (error) {
    return res.status(500).send('Error al actualizar el atributo esCoordinador');
  }
});


module.exports = router;
