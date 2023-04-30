const Usuario = require("../Modelos/Usuario.js");

const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class UsuarioDAO {
    async crearUsuario(usuario) {
        try {
            const query = `INSERT INTO usuario (cedulaUsuario,nombre,segundoNombre,apellido1,apellido2,correo,clave,celular,rol)
                        VALUES(@cedula,@nombre,@segundoNombre,@apellido1,@apellido2,@correo,@clave,@celular,@rol)`;

            const request = new sql.Request(dbSql.conection);
            request.input('cedula',sql.Int,usuario.cedula);
            request.input('nombre',sql.NVarChar,usuario.nombre);

            await request.query(query);
        }catch(error){
            console.log(error);
        }
        
    }

    async actualizarRol(cedula,rolNuevo){
        try{
            const query = `UPDATE usuario set rol = @rolNuevo WHERE cedulaUsuario = @cedula`;

            const request = new sql.Request(dbSql.conection);
            request.input('cedula',sql.Int,cedula);
            request.input('rol',sql.NVarChar, rolNuevo);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }



    async getUsuario(cedula){
        try{
            const query = `SELECT * FROM usuario WHERE cedulaUsuario = @cedula`;
            const request = new sql.Request(dbSql.conection);
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
            console.log("entre");
            const query = `SELECT * FROM usuario`;
            const request = new sql.Request(dbSql.conection);
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
            const query = `DELETE FROM usuario WHERE cedulaUsuario = @cedula`;
            const request = new sql.Request(dbSql.conection);
            request.input('cedula',sql.Int,cedula);
            await request.query(query);
        }catch(error){
            console.error(error);
        }
    }
}

module.exports = UsuarioDAO;