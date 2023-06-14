const Notificacion = require("../Modelos/Notificacion");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class NotificacionDAO{

    async crearNotificacion(notificacion){
        try {
            const request = new sql.Request(dbSql.conection);
            request.input('emisor', sql.VarChar, notificacion.emisor);
            request.input('receptor',sql.Int,notificacion.receptor);
            request.input('contenido',sql.VarChar,notificacion.contenido);
            request.input('fechaHora',sql.DateTime,notificacion.fechaHora);

            await request.query(`INSERT INTO Notificacion(emisor,receptor,contenido,fechaHora,estadoLeido) VALUES (@emisor
                ,@receptor,@contenido,@fechaHora,0)`);


        } catch (error) {
            console.error(error);
        }
    }

    async getNotificaciones(){
        try {
            const query = "SELECT * FROM Notificacion";
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const notifaciones = resultado.recordset.map(row=>{
                    const notificacion = new Notificacion(
                        row.id,
                        row.emisor,
                        row.receptor,
                        row.contenido,
                        row.fechaHora,
                        row.estadoLeido
                    );
                    return notificacion;
                });
                return notifaciones;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getNotificacionesPorReceptor(cedula){
        try {
            const query = `EXEC verNotificacionPorReceptor @receptor`;
            const request = new sql.Request(dbSql.conection);
            request.input("receptor",sql.Int,cedula);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const notifaciones = resultado.recordset.map(row=>{
                    const notificacion = new Notificacion(
                        row.id,
                        row.emisor,
                        row.receptor,
                        row.contenido,
                        row.fechaHora,
                        row.estadoLeido
                    );
                    return notificacion;
                });
                return notifaciones;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async cambiarEstadoNotificacion(id,estadoLeido){
        try {
            const query = `EXEC cambiarEstadoLeidoNotificacion @id,@estadoLeido`;
            const request = new sql.Request(dbSql.conection);
            request.input('id', sql.Int, id);
            request.input('estadoLeido', sql.Bit, estadoLeido);
            await request.query(query);
        } catch (error) {
            console.log(error);
        }
    }

    async eliminarNotificacion(id){
        try {
            const request = new sql.Request(dbSql.conection);
            const query = `DELETE FROM Notificacion WHERE id = @id`;
            request.input('id',sql.Int,id);
            await request.query(query);

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = NotificacionDAO;