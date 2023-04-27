const sql = require('mssql');

const config ={
    user: 'CloudSAc56d9739',
    password: 'pekiLinda123',
    server: 'servidor-proyecto-ds.database.windows.net',
    database: 'DB_PROYECTO_DS',
    options:{
        encrypt:true,
        enableArithAbort:true
    }
};

class AzureSQLDataBase{
    constructor(){
        if(AzureSQLDataBase.instance){
            return AzureSQLDataBase.instance;
        }
        AzureSQLDataBase.instance = this;

        this.connection = new sql.ConnectionPool(config)
        .connect()
        .then(pool=>{
            console.log("Conexion a Azure SQL DataBase exitosa");
            return pool;
        }).catch(error=>console.log("Error al conectar a la base de datos: ",error));
    }

}

const instance = new AzureSQLDataBase();
Object.freeze(instance); //Convierte en inmutable a la instancia, es decir, ya no se puede modificar las propiedadades de dicha.

module.exports = instance;