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