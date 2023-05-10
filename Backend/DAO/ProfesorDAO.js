const Profesor = require("../Modelos/Profesor");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ProfesorDAO{

    async crearProfesor(profesor){
        try {

            const request = new sql.Request(dbSql.conection);

            request.input('cedulaProfesor', sql.Int, profesor.cedula);
            request.input('codigo', sql.VarChar, profesor.codigo);
            request.input('esCordinador', sql.Int,profesor.esCordinador);
            request.input('nombre', sql.VarChar,profesor.nombre);
            request.input('segundonombre', sql.VarChar,profesor.segundoNombre);
            request.input('apellido1', sql.VarChar,profesor.apellido1);
            request.input('apellido2', sql.VarChar,profesor.apellido2);
            request.input('correo', sql.VarChar,profesor.correo);
            request.input('clave', sql.VarChar,profesor.clave);
            request.input('rol', sql.VarChar,profesor.rol);
            request.input('celular', sql.Int,profesor.celular);
            request.input('idSede', sql.Int,profesor.idSede);
            request.input('telOficina', sql.VarChar,profesor.telOficina);
            request.input('foto', sql.VarChar,profesor.foto);
            
            await request.execute("crear_profesor");
        } catch (error) {
            console.log(error);
        }
    }

    async ActualizarBoolCoordinador(cedulaProfesor,boolean){
        try {
            const query = `UPDATE profesor set esCordinador = @boolean WHERE cedulaProfesor = @cedulaProfesor`;
            const request = new sql.Request(dbSql.conection);
            request.input('boolean',sql.Int,boolean);
            request.input('cedulaProfesor',sql.Int,cedulaProfesor);

            await request.query(query);

        } catch (error) {
            console.error(error);
        }
    }

    //Acepta cedula o codigo
    async getProfe(parametro){
        try {
            const query = `SELECT `;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);
            if(resultado.recordset.length > 0){
                const row = resultado.recordset[0];
                const profesor = new Profesor(
                    row.cedulaUsuario,
                    row.codigo,
                    row.esCordinador,
                    row.nombre,
                    row.segundonombre,
                    row.apellido1,
                    row.apellido2,
                    row.correo,
                    row.clave,
                    row.celular,
                    row.rol,
                    row.idSede,
                    row.telOficina,
                    row.foto
                );
                return profesor;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getAllProfes(){
        try {
            const query = ``;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const profesores = resultado.recordset.map(row => new Profesor(row));
                return profesores;
            }
            else {
                return [];
            }
        } catch (error) {
            
        }
    }
}

module.exports = ProfesorDAO;