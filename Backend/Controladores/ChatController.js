const Chat = require("../Modelos/Chat.js");
const ChatParticipantes = require("../Modelos/ChatParticipantes.js");
const Mensaje = require("../Modelos/Mensaje.js");

const ChatDAO = require("../DAO/ChatDAO");

const express = require("express");
const router = express.Router();

chatDAO = new ChatDAO();

//POST -> Localhost:4000/chat
router.post('/', async (req, res) => {
    try {
        const{idProfesorCreador, nombre, participantes} = req.body;

        const idChat = await chatDAO.generarCodigoChat();
        console.log(req.body);
        const nuevoChat = new Chat(
            idChat,
            idProfesorCreador,
            nombre
        );

        const creadorParticipante = new ChatParticipantes(
            idChat,
            idProfesorCreador
        );

        console.log(nuevoChat);
        await chatDAO.createNewChat(nuevoChat);

        await chatDAO.addParticipanteNewChat(creadorParticipante);

    } catch(error){
        console.error('Error en insertChat', error);
        return res.status(500).send('Error al crear el chat');
    }
});

//GET -> Localhost:4000/chat:idParticipante
router.get('/:idParticipante', async (req, res) => {
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

module.exports = router;
