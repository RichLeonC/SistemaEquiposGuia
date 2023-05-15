const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

const EquipoGuia = require("../Modelos/EquipoGuia.js");
const Profesor_EquipoGuia = require("../Modelos/Profesor_EquipoGuia.js");

class EquipoGuiaDAO {


    async crearEquipoGuia(equipoGuia) {
        try {
            const request = new sql.Request(dbSql.conection);
            const checkIfExists = await request.query(`SELECT COUNT(*) AS count FROM equipoGuia WHERE generacion = ${equipoGuia.generacion}`);
            if (checkIfExists.recordset[0].count > 0) {
                throw new Error('El profesor ya existe en la base de datos.');
            }

            request.input('generacion', sql.Int, equipoGuia.generacion);
            request.input('idCoordinador', sql.Int, equipoGuia.idCoordinador);
            await request.query(`INSERT INTO equipoGuia (generacion, idCoordinador) VALUES (@generacion, @idCoordinador)`);
        } catch (error) {
            console.error(error);
        }


    }

    async getEquipoGuias() {
        try {
            const query = "SELECT * FROM equipoGuia"
            const request = new sql.Request(dbSql.conection);

            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
              
                const equipos = resultado.recordset.map(row => {

                    const equipo = new EquipoGuia(
                        row.generacion,
                        row.idCoordinador
                    );
                    return equipo;
                });
                return equipos
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async eliminarEquipo(){
        try {


            
        } catch (error) {
            console.error(error);
        }
    }

    async agregarProfeAEquipoGuia(idProfesor,generacion){
        try {
            const request = new sql.Request(dbSql.conection);   
            request.input('generacion', sql.Int, generacion);
            request.input('idProfesor', sql.VarChar, idProfesor);
            const checkIfExists = await request.query(`SELECT COUNT(*) AS count FROM profesor_equipoGuia WHERE idProfesor = @idProfesor`);
            if (checkIfExists.recordset[0].count > 0) {
                throw new Error('El profesor ya tiene equipo guia.');
            }
            await request.query(`INSERT INTO profesor_equipoGuia (generacion, idProfesor) VALUES (@generacion, @idProfesor)`);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getProfesEquipoGuia(){
        try {
            const query = "SELECT * FROM profesor_equipoGuia"
            const request = new sql.Request(dbSql.conection);

            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
              
                const profesores = resultado.recordset.map(row => {
                    
                    const profesor = new Profesor_EquipoGuia(
                        row.generacion,
                        row.idProfesor
                    );
                    return profesor;
                });
                return profesores
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = EquipoGuiaDAO;