class Actividad{
    constructor(codigoActividad, tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinal, AficheURL){
        this.codigoActividad = codigoActividad;
        this.tipoActividad = tipoActividad;
        this.nombreActividad = nombreActividad;
        this.fechaInicio = fechaInicio;
        this.horaInicio = horaInicio;
        this.fechaCreacion = fechaCreacion;
        this.modalidad = modalidad;
        this.enlaceReunion = enlaceReunion;
        this.estadoActividad = estadoActividad;
        this.fechaFinal = fechaFinal;
        this.AficheURL = AficheURL;
    }
}

module.exports = Actividad;