const ListaEstudiantes = require("../Modelos/ListaEstudiantes");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ListaEstudiantesDAO{
    
    async crearRegistroArchivo(archivo){
        try {
            const request = new sql.Request(dbSql.conection);

            request.input('cedulaPersonal', sql.Int, archivo.cedulaPersonal);
            request.input('excel', sql.VarChar, archivo.excel);
            request.input('fecha',sql.DateTime,archivo.fecha);

            await request.query("INSERT INTO listaEstudiantes(cedulaPersonal,excel,fecha) VALUES(@cedulaPersonal,@excel,@fecha)");

        } catch (error) {
            throw new Error(error);
        }
    }

    async getRegistros(){
        try {
            const query = "SELECT * FROM listaEstudiantes ORDER BY idArchivo DESC";
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);
            if (resultado.recordset.length > 0) {
                const registros = resultado.recordset.map(row=>{
                    const registro = new ListaEstudiantes(
                        row.idArchivo,
                        row.cedulaPersonal,
                        row.excel,
                        row.fecha
                    );
                    return registro;
                });
                return registros;
            }else{
                return [];
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async eliminarRegistro(idArchivo){
        try {
            const request = new sql.Request(dbSql.conection);
            const query = `DELETE FROM listaEstudiantes WHERE idArchivo = @idArchivo`;
            request.input('idArchivo',sql.Int,idArchivo);
            await request.query(query);

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = ListaEstudiantesDAO;