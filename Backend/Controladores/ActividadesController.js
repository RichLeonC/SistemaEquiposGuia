const Actividad = require("../Modelos/Actividad")
const ActividadDAO = require("../DAO/ActividadDAO.js");
const express = require("express");
const router = express.Router();

const actividadDAO = new ActividadDAO();

// POST -> localhost:4000/actividades
router.post('/', async (req, res) => {
    try {
      const { tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinal } = req.body;
  
      // Validar los datos de entrada
      if (!tipoActividad || !nombreActividad || !fechaInicio || !horaInicio || !fechaCreacion || !modalidad || !estadoActividad || !fechaFinal) {
        return res.status(400).send('Todos los campos son obligatorios');
      }
        // Convertir codigoActividad a número entero
      const codigoActividad = await actividadDAO.generarCodigoActividad();
      const nuevaActividad = new Actividad(
        codigoActividad,
        tipoActividad,
        nombreActividad,
        fechaInicio,
        horaInicio,
        fechaCreacion,
        modalidad,
        enlaceReunion,
        estadoActividad,
        fechaFinal
      );
  
      await actividadDAO.insertActividad(nuevaActividad);
  
      return res.status(201).send('Actividad creada exitosamente.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al crear la Actividad.');
    }
  });

  
// GET -> localhost:4000/actividades
router.get('/', async (req, res) => {
    try {
      const actividades = await actividadDAO.getAllActividades();
      console.log(actividades)
      res.status(200).json(actividades);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      res.status(500).json({ error: "Error al obtener las actividades" });
    }
  });
  
  module.exports = router;