const Estudiante = require("../Modelos/Estudiante.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class EstudianteDAO {

    async getAllEstudiantes() {
        try {
            const query = `SELECT * FROM estudiante`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const estudiantes = resultado.recordset.map(row => new Estudiante(row));
                return estudiantes;
            }
            else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }


    async getEstudianteCarne(carne) {
        try {
            const query = `EXEC SelectEstudiante @carne = ${carne}`;
            const request = new sql.Request(dbSql.conection);
            // request.input('carne', sql.Int, carne);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const row = resultado.recordset[0];
                const estudiante = new Estudiante(
                    row.cedulaEstudiante,
                    row.carne,
                    row.codigoCarrera,
                    row.idSede,
                    row.generacion
                );
                return estudiante;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    
    async getEstudianteSede(idSede) {
        try {
            const query = `EXEC SelectEstudiante @idSede = ${idSede}`;
            const request = new sql.Request(dbSql.conection);
            // request.input('idSede', sql.Int, idSede);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const row = resultado.recordset[0];
                const estudiante = new Estudiante(
                    row.cedulaEstudiante,
                    row.carne,
                    row.codigoCarrera,
                    row.idSede,
                    row.generacion
                );
                return estudiante;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async actualizarEstudiante(carne, cedulaEstudiante, codigoCarrera, idSede, generacion) {
        try {
            const query = `EXEC [dbo].[UpdateEstudiante] 
            @cedulaEstudiante = ${cedulaEstudiante}
           ,@carne = ${carne}
           ,@codigoCarrera = ${codigoCarrera}
           ,@idSede = ${idSede}
           ,@generacion = ${generacion}`;

            const request = new sql.Request(dbSql.conection);
            request.input('carne', sql.Int, carne);
            request.input('cedulaEstudiante', sql.Int, cedulaEstudiante);
            request.input('codigoCarrera', sql.NVarChar, codigoCarrera);
            request.input('idSede', sql.Int, idSede);
            request.input('generacion', sql.Int, generacion);
            await request.query(query);
        } catch (error) {
            console.error(error);
        }
    }

    
}

module.exports = EstudianteDAO;