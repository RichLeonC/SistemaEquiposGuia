const Actividad = require("../Modelos/Actividad")
const Actividad_Responsable = require("../Modelos/Actividad_Responsables");
const Actividad_Cancelada = require("../Modelos/Actividad_Cancelada.js")
const Actividad_Recordatorio = require("../Modelos/Actividad_Recordatorio");

const ActividadDAO = require("../DAO/ActividadDAO.js");

const express = require("express");
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const blobStorage = require("../BaseDatos/AzureBlobStorage.js");
const fs = require('fs');
const Actividad_Evidencia_Asistencia = require("../Modelos/Actividad_Evidencia_Asistencia");

const actividadDAO = new ActividadDAO();

// POST -> localhost:4000/actividades
router.post('/', upload.single('afiche'), async (req, res) => {
    try {
      const { tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinal, generacion, idProfesor } = req.body;
      // Validar los datos de entrada
      if (!tipoActividad || !nombreActividad || !fechaInicio || !horaInicio || !fechaCreacion || !estadoActividad || !fechaFinal) {
        return res.status(400).send('Todos los campos son obligatorios');
      }
        // Convertir codigoActividad a número entero
      const codigoActividad = await actividadDAO.generarCodigoActividad();

      const aficheUrl = await blobStorage.subirArchivoABlobStorage('imagenes-sistemaguia', req.file);
      fs.unlinkSync(req.file.path);


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
        fechaFinal,
        aficheUrl
      );

      const responsable = new Actividad_Responsable(
        codigoActividad,
        generacion,
        idProfesor
      )
  
      await actividadDAO.insertActividad(nuevaActividad);
      await actividadDAO.insertProfesorEncargado(responsable);
  
      return res.status(201).send('Actividad creada exitosamente.');
    } catch (error) {
      console.error(error);
      return res.status(500).send('Error al crear la Actividad.');
    }
  });

router.get('/profesorEncargado/:idActividad', async (req, res) => {
  try{
      const {idActividad} = req.params;
      const profesor = await actividadDAO.getProfesorResponsable(parseInt(idActividad));
      console.log(profesor);
      return res.status(200).json(profesor);
  } catch(error){
    console.error(error);
    res.status(500).send("Error al obtener al profesor encargado")
  }
})
  
// GET -> localhost:4000/actividades
router.get('/', async (req, res) => {
    try {
      const actividades = await actividadDAO.getAllActividades();
      //console.log(actividades)
      res.status(200).json(actividades);
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      res.status(500).json({ error: "Error al obtener las actividades" });
    }
  });

  // GET -> localhost:4000/actividades/:idActividad/recordatorio
router.get('/:idActividad/recordatorio', async (req, res) => {
  try {
    const idActividad = req.params.idActividad;
    const recordatorio = await actividadDAO.getActividadRecordatorio(idActividad);
    if (recordatorio) {
      res.status(200).json(recordatorio);
    } else {
      res.status(404).json({ error: "Recordatorio no encontrado" });
    }
  } catch (error) {
    console.error("Error al obtener el recordatorio:", error);
    res.status(500).json({ error: "Error al obtener el recordatorio" });
  }
});


  // GET -> localhost:4000/actividades/:idActividad/evidencia
  router.get('/:idActividad/evidencia', async (req, res) => {
    try {
      const idActividad = req.params.idActividad;
      const evidencia = await actividadDAO.getEvidenciaActividad(idActividad);
      if (evidencia) {
        res.status(200).json(evidencia);
      } else {
        res.status(404).json({ error: "evidencia no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el evidencia:", error);
      res.status(500).json({ error: "Error al obtener el evidencia" });
    }
  });

  // GET -> localhost:4000/actividades/:idActividad/cancelacion
  router.get('/:idActividad/cancelada', async (req, res) => {
    try {
      const idActividad = req.params.idActividad;
      const cancelacion = await actividadDAO.getActividadCancelada(idActividad);
      if (cancelacion) {
        res.status(200).json(cancelacion);
      } else {
        res.status(404).json({ error: "cancelacion no encontrado" });
      }
    } catch (error) {
      console.error("Error al obtener el cancelacion:", error);
      res.status(500).json({ error: "Error al obtener el cancelacion" });
    }
  });



  //PUT -> localhost:4000/actividades/:id/estadoActividad
  router.put('/estadoActividad', upload.single('fotoEvidencia'), async (req, res) =>{
    try{

      const{idActividad, estado, observacion, fecha, fechaPublicacion, diasRepeticion} = req.body;
      console.log(estado)
      estadoInt = parseInt(estado);
      await actividadDAO.actualizarEstado(parseInt(idActividad), parseInt(estado));
      

    
          if(estadoInt === 3){
            const cancelada = new Actividad_Cancelada(idActividad, observacion, fecha);
            await actividadDAO.insertActividadCancelada(cancelada);

          } else if(estadoInt === 2){
            const evidenciaUrl = await blobStorage.subirArchivoABlobStorage('imagenes-sistemaguia', req.file);
            fs.unlinkSync(req.file.path);
            const evidencia = new Actividad_Evidencia_Asistencia(idActividad, evidenciaUrl, null);
            await actividadDAO.insertEvidenciaActividad(evidencia)
            console.log("Evidencia de actividad realizada insertada")

          } else if(estadoInt === 1){          
            const diasRepeticionInt = parseInt(req.body.diasRepeticion, 10);
            const recordatorio = new Actividad_Recordatorio(idActividad, fechaPublicacion, diasRepeticionInt);
            await actividadDAO.insertActividadRecordatorio(recordatorio);
            
            console.log("Recordatorio insertado")
          } 
    
      return res.status(200).send('Estado de la actividad actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el estado de la actividad:', error);
      return res.status(500).send('Error al actualizar el estado de la actividad');
    }
  });
  
  module.exports = router;