const Profesor = require("../Modelos/Profesor");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ProfesorDAO {

    async crearProfesor(profesor) {
        try {

            const request = new sql.Request(dbSql.conection);
            console.log("Codigo: "+profesor.codigo);
            request.input('cedulaProfesor', sql.Int, profesor.cedula);
            request.input('codigo', sql.VarChar, profesor.codigo);
            request.input('esCordinador', sql.Int, profesor.esCordinador);
            request.input('nombre', sql.VarChar, profesor.nombre);
            request.input('segundonombre', sql.VarChar, profesor.segundoNombre);
            request.input('apellido1', sql.VarChar, profesor.apellido1);
            request.input('apellido2', sql.VarChar, profesor.apellido2);
            request.input('correo', sql.VarChar, profesor.correo);
            request.input('clave', sql.VarChar, profesor.clave);
            request.input('rol', sql.VarChar, profesor.rol);
            request.input('celular', sql.Int, profesor.celular);
            request.input('idSede', sql.Int, profesor.idSede);
            request.input('telOficina', sql.VarChar, profesor.telOficina);
            request.input('foto', sql.VarChar, profesor.foto);

            await request.execute("crear_profesor");
        } catch (error) {
            console.log(error);
        }
    }

    async ActualizarBoolCoordinador(cedulaProfesor, boolean) {
        try {
            const query = `UPDATE profesor set esCordinador = @boolean WHERE cedulaProfesor = @cedulaProfesor`;
            const request = new sql.Request(dbSql.conection);
            request.input('boolean', sql.Int, boolean);
            request.input('cedulaProfesor', sql.Int, cedulaProfesor);

            await request.query(query);

        } catch (error) {
            console.error(error);
        }
    }

    //Acepta cedula o codigo
    async getProfe(parametro) {
        try {
            let query = "";
            const request = new sql.Request(dbSql.conection);
            if (isNaN(parametro)) {
                query = `EXEC verProfesoresPorCedulaOCodigo @codigo="${parametro}"`;
            }
            else {
                query = `EXEC verProfesoresPorCedulaOCodigo @cedula=${parametro}`;
            }


            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
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
            else{
                return null;
            }
        } catch (error) {
            console.error(error);
        }
    }

    async getAllProfes() {
        try {
            const query = `EXEC verProfesores`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const profesores = resultado.recordset.map(row =>{
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
                });
                return profesores;
            }
            else {
                return [];
            }
        } catch (error) {

        }
    }

    async generarCodigoProfesor(idSede) {
        try {
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.input('idSede', sql.Int, idSede).execute('contarProfesoresPorSede');

            const cantProfesores = resultado.recordset[0].cantidad;
            const numeroCodigo = String(cantProfesores + 1).padStart(2, '0'); //Indicamos que agregue un 0 adelante hasta que se alcance la cantidad de dos digitos en cantidad de profesores.
            let prefijo = '';

            switch(idSede){
                case "1":
                    prefijo="CA";
                    break;
                case "2":
                    prefijo="SJ";
                    break;
                case "3":
                    prefijo="AL";
                    break;
                case "4":
                    prefijo="LI";
                    break;
                case "5":
                    prefijo="SC";
                    break;
            }
            return `${prefijo}-${numeroCodigo}`;
        } catch (error) {
            console.error(error);

        }
    }
}

module.exports = ProfesorDAO;