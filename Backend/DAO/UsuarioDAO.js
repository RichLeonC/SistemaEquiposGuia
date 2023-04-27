const Usuario = require("../Modelos/Usuario.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");

class UsuarioDAO {
    async crearUsuario(usuario) {
        try {
            const query = `INSERT INTO Usuario (cedula,nombre,segundoNombre,apellido1,apellido2,correo,clave,celular,rol)
                        VALUES(@cedula,@nombre,@segundoNombre,@apellido1,@apellido2,@correo,@clave,@celular,@rol)`;

            const request = new dbSql.connection.Request();
            request.input('cedula',sql.Int,usuario.cedula);
            request.input('nombre',sql.NVarChar,usuario.nombre);

            await request.query(query);
        }catch(error){
            console.log(error);
        }
        
    }

    async actualizarRol(usuario){
        try{
            const query = `UPDATE Usuario set rol = @rol WHERE cedula = @cedula`;

            const request = new dbSql.connection.Request();
            request.input('cedula',sql.Int,usuario.cedula);
            request.input('rol',sql.NVarChar, usuario.rol);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }

    async actualizarClave(usuario,tokenGenerado,tokenInsertado,claveNueva){
        try{
            const query = `UPDATE Usuario set clave = @clave WHERE cedula = @cedula`;

            const request = new dbSql.connection.Request();
            request.input('cedula',sql.Int,usuario.cedula);
            request.input('clave',sql.NVarChar, usuario.claveNueva);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }

    async getUsuario(cedula){
        try{
            const query = `SELECT * FROM Usuario WHERE cedula = @cedula`;
            const request = new dbSql.connection.Request();
            request.input('cedula',sql.Int,cedula);
            const resultado = await request.query(query);

            if(resultado.recordset.length>0){
                const usuario = new Usuario(resultado.recordset[0]);
                return usuario;
            }
            else{
                return null;
            }
        }catch(error){
            console.error(error);
            return null;
        }
    }

    async getAllUsuarios(){
        try{
            const query = `SELECT * FROM Usuario`;
            const request = new dbSql.connection.Request();
            const resultado = await request.query(query);
            
            if(resultado.recordset.length>0){
                const usuarios = resultado.recordset.map(row=>new Usuario(row));
                return usuarios;
            }
            else{
                return [];
            }
        }catch(error){
            console.error(error);
            return [];
        }
    }

    async eliminarUsuario(cedula){
        try{
            const query = `DELETE FROM users WHERE cedula = @cedula`;
            const request = new dbSql.connection.Request();
            request.input('cedula',sql.Int,cedula);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = UsuarioDAO;