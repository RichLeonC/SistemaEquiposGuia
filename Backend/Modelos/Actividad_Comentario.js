class Actividad_Comentario{
    constructor(idActividad, idComentario, idProfesor, mensaje, fecha, hora) {
        this.idActividad = idActividad;
        this.idComentario = idComentario;
        this.idProfesor = idProfesor;
        this.mensaje = mensaje;
        this.fecha = fecha;
        this.hora = hora;
    }
}

module.exports = Actividad_Comentario;