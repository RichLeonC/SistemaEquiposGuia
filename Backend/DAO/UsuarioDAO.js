const Usuario = require("../Modelos/Usuario.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class UsuarioDAO {

    async login(correo, clave) {
        try {



        } catch (error) {
            console.error(error);
        }
    }

    async crearUsuario(usuario) {
        try {
            const query = `INSERT INTO usuario (cedulaUsuario,nombre,segundoNombre,apellido1,apellido2,correo,clave,celular,rol)
                        VALUES(@cedula,@nombre,@segundoNombre,@apellido1,@apellido2,@correo,@clave,@celular,@rol)`;

            const request = new sql.Request(dbSql.conection);
            request.input('cedula', sql.Int, usuario.cedula);
            request.input('nombre', sql.NVarChar, usuario.nombre);

            await request.query(query);
        } catch (error) {
            console.log(error);
        }

    }

    async actualizarRol(cedula, rolNuevo) {
        try {
            const query = `UPDATE usuario set rol = @rolNuevo WHERE cedulaUsuario = @cedula`;

            const request = new sql.Request(dbSql.conection);
            request.input('cedula', sql.Int, cedula);
            request.input('rol', sql.NVarChar, rolNuevo);
            await request.query(query);
        } catch (error) {
            console.error(error);
        }
    }



    async getUsuario(cedula) {
        try {
            const query = `SELECT * FROM usuario WHERE cedulaUsuario = ${cedula}`;
            const request = new sql.Request(dbSql.conection);
            // request.input('cedula', sql.Int, cedula);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const row = resultado.recordset[0];
                const usuario = new Usuario(
                    row.cedulaUsuario,
                    row.nombre,
                    row.segundonombre,
                    row.apellido1,
                    row.apellido2,
                    row.correo,
                    row.clave,
                    row.celular,
                    row.rol
                );
                return usuario;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getUsuario_Correo(correo) {
        try {
            const query = `SELECT * FROM usuario WHERE correo = @correo`;
            const request = new sql.Request(dbSql.conection);
            request.input('correo', sql.VarChar, correo);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const row = resultado.recordset[0];
                const usuario = new Usuario(
                    row.cedulaUsuario,
                    row.nombre,
                    row.segundonombre,
                    row.apellido1,
                    row.apellido2,
                    row.correo,
                    row.clave,
                    row.celular,
                    row.rol
                );
                return usuario;
            }
            else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getAllUsuarios() {
        try {
            const query = `SELECT * FROM usuario`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            if (resultado.recordset.length > 0) {
                const usuarios = resultado.recordset.map(row =>{
                    const usuario = new Usuario(
                        row.cedulaUsuario,
                        row.nombre,
                        row.segundonombre,
                        row.apellido1,
                        row.apellido2,
                        row.correo,
                        row.clave,
                        row.celular,
                        row.rol
                    );
                    return usuario;
                    
                });
                return usuarios;

            }
            else {
                return [];
            }
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async eliminarUsuario(cedula) {
        try {
            const query = `DELETE FROM usuario WHERE cedulaUsuario = @cedula`;
            const request = new sql.Request(dbSql.conection);
            request.input('cedula', sql.Int, cedula);
            await request.query(query);
        } catch (error) {
            console.error(error);
        }
    }

    async actualizarClave(correo,clave){
        try{
            const query  = `Update usuario set clave=@clave WHERE correo = @correo`;
            const request = new sql.Request(dbSql.conection);
            request.input('correo',sql.VarChar,correo);
            request.input('clave',sql.VarChar,clave);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = UsuarioDAO;