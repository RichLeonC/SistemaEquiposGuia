const Notificacion = require("../Modelos/Notificacion");
const NotificacionDAO = require("../DAO/NotificacionDAO");
const ServicioNotificaciones = require("../Patrones/ServicioNotificaciones")
const Usuario = require("../Modelos/Usuario");
const express = require("express");
const router = express.Router();
const moment = require('moment-timezone'); 
const miZonaHoraria = 'America/Costa_Rica'; 
const notificacionDAO = new NotificacionDAO();

const servicioNotificaciones = new ServicioNotificaciones();

//GET -> localhost:4000/notificaciones
router.get('/', async (req, res) => {
    try {
        const notifaciones = await notificacionDAO.getNotificaciones();
        res.status(200).json(notifaciones);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las notificaciones");
    }

});

//GET -> localhost:4000/notificaciones/:cedula 
router.get('/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        const notificaciones = await notificacionDAO.getNotificacionesPorReceptor(cedula);
        res.status(200).json(notificaciones);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener las notificaciones");
    }

});

// POST -> localhost:4000/notificaciones
router.post('/', async (req, res) => {
    try {
        const { emisor, receptor, contenido } = req.body;

        // Validamos los datos de entrada
        if (!emisor || !receptor) {
            return res.status(400).send('Todos los campos son obligatorios, excepto Contenido.');
        }
        const fecha = moment().tz(miZonaHoraria).format('YYYY-MM-DD HH:mm:ss');

        const nuevaNotificacion = new Notificacion(null,emisor,receptor,contenido,fecha,0);
        await notificacionDAO.crearNotificacion(nuevaNotificacion);

        return res.status(201).send('Notificacion creada exitosamente.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al crear la notificacion.');
    }
});

// PUT -> localhost:4000/notificaciones/cambiarEstado
router.put('/cambiarEstado',async(req,res)=>{
    try {
        const {id,estadoLeido} = req.body;

        await notificacionDAO.cambiarEstadoNotificacion(id,estadoLeido);
        return res.status(201).send('Estado cambiado correctamente.');
    } catch (error) {
        return res.status(500).send('Error al cambiar el estado de la notificacion');
        
    }
})

// DELETE -> localhost:4000/notificaciones/:id
router.delete('/:id',async(req,res)=>{
    try {
        const {id} = req.params;

        await notificacionDAO.eliminarNotificacion(id);
        return res.status(201).send('Notificacion eliminada correctamente.');
    } catch (error) {
        return res.status(500).send('Error al eliminar la notificacion');
        
    }
});

// POST -> localhost:4000/notificaciones/suscribir
router.post('/suscribir/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;

        // const fecha = moment().tz(miZonaHoraria).format('YYYY-MM-DD HH:mm:ss');

        // const nuevaNotificacion = new Notificacion(null,emisor,cedula,contenido,fecha,0);
        // await notificacionDAO.crearNotificacion(nuevaNotificacion);
        servicioNotificaciones.suscribe(cedula);
        return res.status(201).send('Usuario suscrito exitosamente.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al suscribir al usuario.');
    }
});

// POST -> localhost:4000/notificaciones/suscribir
router.post('/notificar', async (req, res) => {
    try {

        const {emisor,contenido} = req.body;
        servicioNotificaciones.notify(new Notificacion(null,emisor,null,contenido,null,0));
        return res.status(201).send('Usuarios notificados exitosamente.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al notificar a los usuarios.');
    }
});

// DELETE -> localhost:4000/notificaciones/desuscribir
router.delete('/desuscribir/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;

        servicioNotificaciones.unsubscribe(cedula);
        console.log(servicioNotificaciones.suscriptores)
        return res.status(201).send('Usuario desuscrito exitosamente.');
    } catch (error) {
        console.error(error);
        return res.status(500).send('Error al desuscribir al usuario.');
    }
});

module.exports = router;