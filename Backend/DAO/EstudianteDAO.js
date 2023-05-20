const Estudiante = require("../Modelos/Estudiante.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class EstudianteDAO {

    async crearEstudiante(estudiante){
        try {
            const request = new sql.Request(dbSql.conection);

            const checkIfExists = await request.query(`SELECT COUNT(*) AS count FROM estudiante WHERE carne = ${estudiante.carne}`);
            if (checkIfExists.recordset[0].count > 0) {
                throw new Error('El estudiante ya existe en la base de datos.');
            }
            request.input('cedulaUsuario', sql.Int, estudiante.cedula);
            request.input('nombre', sql.VarChar, estudiante.codigo);
            request.input('segundonombre', sql.VarChar, estudiante.segundonombre);
            request.input('apellido1', sql.VarChar, estudiante.apellido1);
            request.input('apellido2', sql.VarChar, estudiante.apellido2);
            request.input('correo', sql.VarChar, estudiante.correo);
            request.input('clave', sql.VarChar, estudiante.clave);
            request.input('celular', sql.Int, estudiante.celular);
            request.input('rol', sql.VarChar, estudiante.rol);
            request.input('carne', sql.Int, estudiante.carne);
            request.input('codigoCarrera', sql.VarChar, estudiante.codigocarrera);
            request.input('idSede', sql.Int, estudiante.idSede);
            request.input('generacion', sql.Int, estudiante.generacion);

            await request.execute("crearEstudiante");
        } catch (error) {
            throw new Error("Verifica que no existan elementos duplicados")
        }
    }

    async getAllEstudiantes() {
        try {
            const query = `EXEC verEstudiantes`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const estudiantes = resultado.recordset.map(row => {
                    const estudiante = new Estudiante(
                        row.cedulaUsuario,
                        row.nombre,
                        row.segundonombre,
                        row.apellido1,
                        row.apellido2,
                        row.correo,
                        row.clave,
                        row.celular,
                        row.rol,
                        row.carne,
                        row.codigoCarrera,
                        row.idSede,
                        row.generacion
                    );
                    return estudiante;
                });
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