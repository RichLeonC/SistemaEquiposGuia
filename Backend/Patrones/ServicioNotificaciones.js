const NotificacionDAO = require("../DAO/NotificacionDAO");
const Notificacion = require("../Modelos/Notificacion");
const moment = require('moment-timezone');
const miZonaHoraria = 'America/Costa_Rica';

const notificacionDAO = new NotificacionDAO();

class ServicioNotificaciones {
    constructor() {
        this.suscriptores = [];
    }

    suscribe(suscriptor) {
        if(!this.suscriptores.includes(suscriptor)){
            this.suscriptores.push(suscriptor);
        }
    }

    unsubscribe(suscriptor) {
        this.suscriptores = this.suscriptores.filter(obs => obs !== suscriptor);
    }

    notify(notificacion) {
        try {
            this.suscriptores.forEach(suscriptor => {
                const notificacion1 = this.crearNotificacion(notificacion.emisor, suscriptor,
                    notificacion.contenido);
                notificacionDAO.crearNotificacion(notificacion1);
            });
        } catch (error) {
            console.error(error)
        }


    }

    crearNotificacion(emisor, receptor, contenido) {
        const fechaHora = moment().tz(miZonaHoraria).format('YYYY-MM-DD HH:mm:ss');
        return new Notificacion(null, emisor, receptor, contenido, fechaHora);
    }
}

module.exports = ServicioNotificaciones;