class Mensaje{
    constuctor(idMensaje, idParticipante, idChat, mensaje){
        this.idMensaje = idMensaje;
        this.idParticipante = idParticipante;
        this.idChat = idChat;
        this.mensaje = mensaje;
    }
}


module.exports = Mensaje;
