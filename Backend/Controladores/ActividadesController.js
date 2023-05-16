const Actividad = require("../Modelos/Actividad")
const ActividadDAO = require("../DAO/ActividadDAO.js");
const express = require("express");
const router = express.Router();

const actividadDAO = new ActividadDAO();

// POST -> localhost:4000/actividades
router.post('/', async (req, res) => {
    try {
      const { codigoActividad, tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinalizacion } = req.body;
  
     /* // Validar los datos de entrada
      if (!codigoActividad || !tipoActividad || !nombreActividad || !fechaInicio || !horaInicio || !fechaCreacion || !modalidad || !enlaceReunion || !estadoActividad || !fechaFinalizacion) {
        return res.status(400).send('Todos los campos son obligatorios');
      }*/
  
      const nuevaActividad = new Actividad({
        codigoActividad,
        tipoActividad,
        nombreActividad,
        fechaInicio,
        horaInicio,
        fechaCreacion,
        modalidad,
        enlaceReunion,
        estadoActividad,
        fechaFinalizacion
      });
  
      await actividadDAO.insertActividad(nuevaActividad);
  
      return res.status(201).send('Actividad creada exitosamente.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al crear la Actividad.');
    }
  });

  
// GET -> localhost:4000/actividades
router.get("/actividades", async (req, res) => {
    try {
      const actividades = await actividadDAO.obtenerActividades();
      res.json(actividades);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      res.status(500).json({ error: "Error al obtener las actividades" });
    }
  });
  
  module.exports = router;