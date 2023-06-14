const { request } = require("express");
const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ChatDAO{
    async createNewChat(chat){
        try{
            const query = `INSERT INTO chat (idChat, idProfesorCreador, nombre)
                            VALUES(@idChat, @idProfesorCreador, @nombre);`
        console.log(chat);
        request.input('idChat', sql.Int, chat.idChat);
        request.input('idProfesorCreador', sql.Int, chat.idProfesorCreador);
        request.input('nombre', sql.VarChar, chat.nombre);

        const result = await request.query(query);
        console.log("Chat nuevo creado :)")
        } catch(error){
            console.error('Error al crear el nuevo chat')
        }
    }

    async addParticipanteNewChat(participante){
        try{
            const query = `
            INSERT INTO chatParticipantes (idChat, idParticipante)
            VALUES(@idChat, @idParticipante);
            `

            console.log(participante);
            request.input('idChat', sql.Int, participante.idChat);
            request.input('idParticipante', sql.Int, participante.idParticipante);
            
            const result = await request.query(query);
            console.log("Participante añadido")
        } catch(error){
            console.error('Error al añadir participante :c')
        }

    }

    async addNewMensajeChatActual(mensaje){
        try{
            const query = `
            INSERT INTO mensaje (idMensaje, idParticipante, idChat, mensaje)
            VALUES (@idMensaje, @idParticipante, @idChat, @mensaje);
            `

            console.log(mensaje);
            request.input('idMensaje', sql.Int, mensaje.idMensaje);
            request.input('idParticipante', sql.Int, mensaje.idParticipante);
            request.input('idChat', sql.Int, mensaje.idChat);
            request.input('mensaje', sql.VarChar, mensaje.mensaje);
            const result = await request.query(query);
            console.log("Mensaje añadido")
        } catch(error){
            console.error('Error al añadir mensaje')
        }

    }

    async getChatsUsuarioActual(cedulaUsuario){
        try{
            const query = `
            SELECT c.*
            FROM chat c
            JOIN chatParticipantes p ON c.idchat = p.idchat
            WHERE p.idUsuario = '${cedulaUsuario}';
            `
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            
          if(resultado.recordset.length > 0){
            const chats = resultado.recordset.map(row => {
                const chat = {
                    idChat: row.idChat,
                    idProfesorCreador: row.idProfesorCreador,
                    nombre: row.nombre,
                };
                return chat;
            });
            return chats;
          } else {
            console.log("Erroren get chats usuario actual");
            return[];
          }
        } catch(error){
            console.error("Error al obtener los chats del usuairo :C");
        }

    }

    async getMensajesChatActual(idChat){
        try{
        const query = `SELECT * FROM mensaje WHERE idChat = '${idChat}'`;
        const request = new sql.Request(dbSql.conection);
        const resultado = await request.query(query);

        if(resultado.recordsert.length > 0){
            const mensajes = resultado.recordset.map(row => {
                const mensaje = {
                    idMensaje: row.idMensaje,
                    idParticipante: row.idParticipante,
                    idChat: row.idChat,
                    mensaje: row.mensaje,
                };
                return mensaje;
            });
            return mensajes;
        }else {
            console.log("Error al obtener mensajes")
            return[];
        }
        }catch(error){
            console.error("error al obtener mensajes")
        }

    }


}