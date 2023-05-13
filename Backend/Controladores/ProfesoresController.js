const Profesor = require("../Modelos/Profesor.js");
const ProfesorDAO = require("../DAO/ProfesorDAO.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.

const multer = require('multer'); //Middleware para usar el upload.single, sirve para enviar archivos o recibir
const upload = multer({ dest: 'uploads/' });
const blobStorage = require("../BaseDatos/AzureBlobStorage.js");


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
    const profesor = await profesorDAO.getProfe(parametro);

    return res.status(200).json(profesor);

  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener el profesor");
  }

});

// POST -> localhost:4000/profesores
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { cedula, esCordinador, nombre, segundoNombre, apellido1, apellido2, correo, clave, celular, idSede, telOficina } = req.body;

    // Validamos los datos de entrada
    if (!cedula || !nombre || !apellido1 || !apellido2 || !correo || !clave || !celular
      || !idSede || !telOficina) {
      return res.status(400).send('Todos los campos son obligatorios, excepto segundoNombre.');
    }
    const codigo = await profesorDAO.generarCodigoProfesor(idSede);
    const salt = await bcrypt.genSalt(10);
    const claveEncriptada = await bcrypt.hash(clave, salt);


    const fotoUrl = await blobStorage.subirArchivoABlobStorage('imagenes-sistemaguia', req.file);

    const nuevoProfesor = new Profesor(cedula, codigo, esCordinador, nombre, segundoNombre, apellido1, apellido2, correo,
      claveEncriptada, celular, "PROFESOR_GUIA", idSede, telOficina, fotoUrl);
    await profesorDAO.crearProfesor(nuevoProfesor);

    return res.status(201).send('Profesor creado exitosamente.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al crear el Profesor.');
  }
});




// PUT -> localhost:4000/profesores/esCordinador
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
