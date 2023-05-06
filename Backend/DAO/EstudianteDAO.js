const Estudiante = require("../Modelos/Estudiante.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class EstudianteDAO {

    async getAllEstudiantes() {
        try {
            const query = `EXEC SelectEstudiante`;
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

    
}

module.exports = EstudianteDAO;