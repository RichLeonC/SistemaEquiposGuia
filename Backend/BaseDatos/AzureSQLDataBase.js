const sql = require('mssql');

const config ={
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
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