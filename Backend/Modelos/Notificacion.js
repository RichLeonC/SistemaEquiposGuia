class Notificacion{
    constructor(id,emisor,receptor,contenido,fechaHora,estadoLeido){
        this.id = id;
        this.emisor = emisor;
        this.receptor = receptor;
        this.contenido = contenido;
        this.fechaHora = fechaHora;
        this.estadoLeido = estadoLeido;

    }

}
module.exports = Notificacion;