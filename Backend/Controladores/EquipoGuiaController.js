const EquipoGuia = require("../Modelos/EquipoGuia");
const EquipoGuiaDAO = require("../DAO/EquipoGuiaDAO");

const express = require("express");
const router = express.Router();

const equipoGuiaDAO = new EquipoGuiaDAO();

//GET -> localhost:4000/equipos
router.get('/', async (req, res) => {
    try {
        const equipos = equipoGuiaDAO.getEquipoGuias();
        res.status(200).json(equipos);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los equipos");
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

module.exports = router;