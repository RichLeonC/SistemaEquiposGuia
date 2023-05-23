const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");
const Actividad_Comentario = require("../Modelos/Actividad_Comentario.js");

class ComentarioDAO{

    async insertComentario(comentario){
        const request = new sql.Request(dbSql.conection);
        try{
            const query = `
            INSERT INTO actividad_comentarios(idActividad, idComentario, idProfesor, mensaje, fecha, hora)
            VALUES (@idActividad, @idComentario, @idProfesor, @mensaje, @fecha, @hora);
            `;

            request.input('idActividad', sql.Int, comentario.idActividad);
            request.input('idComentario', sql.Int, comentario.idComentario);
            request.input('idProfesor', sql.VarChar, comentario.idProfesor);
            request.input('mensaje', sql.VarChar, comentario.mensaje);
            request.input('fecha', sql.Date, comentario.fecha);
            request.input('hora', sql.VarChar, comentario.hora);

            await request.query(query);

        } catch(error){
            console.error('Error al ingresar comentario', error);
        }
    }

    async getComentariosActividad(idActividad){
        try{
            const query = `SELECT * FROM actividad_comentarios WHERE idActividad = '${idActividad}'`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            if(resultado.recordset.length > 0){
                const comentarios = resultado.recordset.map(row => {
                    const comentario = {
                        idActividad: row.idActividad,
                        idComentario: row.idComentario,
                        idProfesor: row.idProfesor,
                        mensaje: row.mensaje,
                        fecha: row.fecha,
                        hora: row.hora,
                    };
                    return comentario;
                });
                return comentarios;
            } else{
                console.log("5mentarios");
                return [];
            }
        } catch(error){
            console.error("Error al obtener los comentarios")
        }
    }

    async generarCodigoComentario(){
        try{
          const request = new sql.Request(dbSql.conection);
          const resultado = await request.query(`SELECT COUNT(*) AS cantidad FROM actividad_comentarios`);

          const cantComentarios = resultado.recordset[0].cantidad;         
          return `${cantComentarios + 1}`;

        }catch(error) {
          console.error("error al recuperar la cantidad de comentarios", error)
        }

      }


}

module.exports = ComentarioDAO;