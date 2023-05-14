const Personal = require("../Modelos/Personal.js");
const PersonalDAO = require("../DAO/PersonalDAO.js");
const express = require("express");
const router = express.Router();

const personalDAO = new PersonalDAO();

//GET -> localhost:4000/asistentes/:cedula
router.get('/:cedula', async (req, res) => {
    try {
        const {cedula} = req.params;
        const asistente = await personalDAO.getAsistente(cedula);
        res.status(200).json(asistente);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el asistente");
    }

});

module.exports = router;