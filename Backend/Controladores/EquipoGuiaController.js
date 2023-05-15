const EquipoGuia = require("../Modelos/EquipoGuia");
const EquipoGuiaDAO = require("../DAO/EquipoGuiaDAO");

const express = require("express");
const router = express.Router();

const equipoGuiaDAO = new EquipoGuiaDAO();

//GET -> localhost:4000/equipos
router.get('/', async (req, res) => {
    try {
        const equipos = await equipoGuiaDAO.getEquipoGuias();
        res.status(200).json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los equipos");
    }

});

//GET -> localhost:4000/equipos/profesEquipoGuia
router.get('/profesEquipoGuia', async (req, res) => {
    try {
        const profes = await equipoGuiaDAO.getProfesEquipoGuia();
        res.status(200).json(profes);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los Profesores");
    }

});

//POST ->localhost:4000/equipos
router.post('/', async (req, res) => {
    try {
        const {generacion,idCoordinador} = req.body;
        if(!generacion){
            return res.status(400).send('Generacion invalida');
        }

        const nuevoEquipo = new EquipoGuia(generacion,idCoordinador);
        await equipoGuiaDAO.crearEquipoGuia(nuevoEquipo);

        return res.status(201).send('Equipo Guia creado exitosamente.');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al crear el equipo");
    }

});

//POST ->localhost:4000/equipos/agregarProfe
router.post('/agregarProfe', async (req, res) => {
    try {
        const {generacion,idProfesor} = req.body;
        if(!generacion||!idProfesor){
            return res.status(400).send('Generacion o idProfesor invalido');
        }

        await equipoGuiaDAO.agregarProfeAEquipoGuia(idProfesor,generacion);

        return res.status(201).send('Profesor agreado a Equipo Guia exitosamente.');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar profesor a equipo guia");
    }

});

module.exports = router;