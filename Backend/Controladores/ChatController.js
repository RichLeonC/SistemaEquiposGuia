const Chat = require("../Modelos/Chat.js");
const ChatParticipantes = require("../Modelos/ChatParticipantes.js");
const Mensaje = require("../Modelos/Mensaje.js");

const ChatDAO = require("../DAO/ChatDAO");

const express = require("express");
const router = express.Router();

chatDAO = new ChatDAO();

//POST -> Localhost:4000/chat/mensaje
router.post('/mensaje', async (req, res) => {
    try {

        const{idChat, idParticipante, mensaje} = req.body;
        console.log(req.body)
       
        const idMensaje = await chatDAO.generarCodigoMensajes()
        const nuevoMensaje = new Mensaje(
            idMensaje,
            idParticipante,
            idChat, 
            mensaje
        );
        console.log(nuevoMensaje);
        await chatDAO.addNewMensajeChatActual(nuevoMensaje);

    } catch(error){
        console.error('Error en post mensaje', error);
        return res.status(500).send('Error al crear el mensaje.');
    }

});

//POST -> Localhost:4000/chat
router.post('/', async (req, res) => {
    try {
        const{idProfesorCreador, nombre, participants} = req.body;

        const idChat = await chatDAO.generarCodigoChat();
        console.log(req.body);
        const nuevoChat = new Chat(
            idChat,
            idProfesorCreador,
            nombre
        );

        const Participante = new ChatParticipantes(
            idChat,
            idProfesorCreador
        );

        console.log(nuevoChat);
        await chatDAO.createNewChat(nuevoChat);
        await chatDAO.addParticipanteNewChat(Participante);

        participants.forEach(async (participante) => {
            //console.log(participante);
            const idParticipante = participante.cedulaUsuario;
            console.log(participante.cedulaUsuario)
            const nuevoParticipante = new ChatParticipantes(idChat, idParticipante); // Crear una nueva instancia de ChatParticipantes con el id del chat y la nueva cédula
            await chatDAO.addParticipanteNewChat(nuevoParticipante); // Utilizar la nueva instancia de ChatParticipantes en lugar de Participante
        });
        

    } catch(error){
        console.error('Error en insertChat', error);
        return res.status(500).send('Error al crear el chat');
    }
});

//GET -> Localhost:4000/chat:idParticipante
router.get('/:idParticipante', async (req, res) => {
    console.log("Mal")
    try{
        const idParticipante = req.params.idParticipante;
        const participantes = await chatDAO.getChatsUsuarioActual(idParticipante);
        if (participantes){
            res.status(200).json(participantes);
        } else {
            res.status(404).json({error: "chat participantes no encontrados"});
        }
    } catch(error){
        console.error("Error al obtener los chat participantes:", error);
        res.status(500).json({error: "Error al obtener los chats participantes"});
    }
});

//GET -> Localhost:4000/chat:idChat
router.get('/mensajes/:idChat', async (req, res) => {
    console.log("Bien")
    try{
        const idChat = req.params.idChat;
        const mensajes = await chatDAO.getMensajesChatActual(idChat);
        if (mensajes){
            res.status(200).json(mensajes);
        } else {
            res.status(404).json({error: "chat mensajes no encontrados"});
        }
    } catch(error){
        console.error("Error al obtener los chat mensajes:", error);
        res.status(500).json({error: "Error al obtener los chats mensajes"});
    }
});

module.exports = router;
