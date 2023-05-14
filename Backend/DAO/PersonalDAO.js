const Personal= require("../Modelos/Personal.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class PersonalDAO{

    async getAsistente(cedula) {
        try {
            const request = new sql.Request(dbSql.conection);
            let query = `EXEC verAsistentePorCedula @cedula=${cedula}`;
           
           // request.input('cedula',sql.Int,cedula);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const row = resultado.recordset[0];
                const personal = new Personal(
                    row.cedula,
                    row.nombre,
                    row.segundoNombre,
                    row.apellido1,
                    row.apellido2,
                    row.correo,
                    row.celular,
                    row.rol,
                    row.idSede,
                    row.telOficina,
                    row.foto
                );
                return personal;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = PersonalDAO;