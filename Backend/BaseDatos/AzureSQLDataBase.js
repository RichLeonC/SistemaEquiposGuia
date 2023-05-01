const sql = require('mssql');

const config ={
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
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

        this.conection = new sql.ConnectionPool(config);
        this.conectionToDatabase();

    }

    async conectionToDatabase() {
        try {
          await this.conection.connect();
          console.log('Conexión a Azure SQL Database exitosa');
        } catch (error) {
          console.error('Error al conectar a la base de datos:', error);
        }
      }

}

const instance = new AzureSQLDataBase();
Object.freeze(instance); //Convierte en inmutable a la instancia, es decir, ya no se puede modificar las propiedadades de dicha.

module.exports = instance;