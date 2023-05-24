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

const actividadDAO = new ActividadDAO();

// POST -> localhost:4000/actividades
router.post('/', upload.single('afiche'), async (req, res) => {
    try {
      const { tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinal, generacion, idProfesor } = req.body;
      // Validar los datos de entrada
      if (!tipoActividad || !nombreActividad || !fechaInicio || !horaInicio || !fechaCreacion || !modalidad || !estadoActividad || !fechaFinal) {
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

  //PUT -> localhost:4000/actividades/:id/cancelar
  router.put('/estadoActividad', async (req, res) =>{
    try{

      const{idActividad, estado, observacion, fecha, evidencia, fechaPublicacion, diasRepeticion} = req.body;
      console.log(diasRepeticion);

      const diasRepeticionInt = parseInt(req.body.diasRepeticion, 10);
      console.log(diasRepeticionInt);
   
      await actividadDAO.actualizarEstado(parseInt(idActividad), parseInt(estado));

      if(estado === 3){
        const cancelada = new Actividad_Cancelada(idActividad, observacion, fecha);
        await actividadDAO.insertActividadCancelada(cancelada);

      } else if(estado === 2){
        console.log("Evidencia de actividad realizada insertada")
      } else if(estado === 1){

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