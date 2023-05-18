const Actividad = require("../Modelos/Actividad")
const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ActividadDAO{

 async insertActividad(actividad) {
    const request = new sql.Request(dbSql.conection);

    try {
    const query = `
      INSERT INTO Actividad (codigoActividad, tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActiviad, fechaFinal)
      VALUES (@codigoActividad, @tipoActividad, @nombreActividad, @fechaInicio, @horaInicio, @fechaCreacion, @modalidad, @enlaceReunion, @estadoActiviad, @fechaFinal);
    `;
  
        console.log(actividad);
        request.input('codigoActividad', sql.Int, actividad.codigoActividad);
        request.input('tipoActividad', sql.Int, actividad.tipoActividad);
        request.input('nombreActividad', sql.VarChar, actividad.nombreActividad);
        request.input('fechaInicio', sql.Date, actividad.fechaInicio);
        request.input('horaInicio', sql.VarChar, actividad.horaInicio);
        request.input('fechaCreacion', sql.Date, actividad.fechaCreacion);
        request.input('modalidad', sql.Int, actividad.modalidad);
        request.input('enlaceReunion', sql.VarChar, actividad.enlaceReunion);
        request.input('estadoActiviad', sql.Int, actividad.estadoActividad);
        request.input('fechaFinal', sql.Date, actividad.fechaFinal);

        const result = await request.query(query);

  
      console.log('Actividad insertada con éxito');
    } catch (error) {
      console.error('Error al insertar la actividad:', error);
    }
  }

async getAllActividades(){
        try{
          const query = `Select * from actividad`;
          const request = new sql.Request(dbSql.conection);
          const resultado = await request.query(query);
          if(resultado.recordset.length > 0){
            const actividades = resultado.recordset.map(row => {

              const fechaInicio = new Date(row.fechaInicio);
              const fechaFinal = new Date(row.fechaFinal);
      
              fechaInicio.setHours(23, 59, 0); // Establecer hora de inicio a las 12 AM, minutos y segundos a 0
              fechaFinal.setHours(23, 59, 0); // Establecer hora de finalización a las 11:59 PM, segundos a 0
              const actividad = {
                title: row.nombreActividad,
                start: fechaInicio,
                end: fechaFinal,
                codigo: row.codigoActividad,
                tipo: row.tipoActividad,
                horaInicio: row.horaInicio,
                creacion: row.fechaCreacion,
                modalidad: row.modalidad,
                enlace: row.enlaceReunion,
                estado: row.estadoActiviad,
              };
              return actividad;
            });
            return actividades;
          }
          else{
            console.log("oh no");
            return[];
          }
        } catch (error){
        }
      }

      async generarCodigoActividad(){
        try{
          const request = new sql.Request(dbSql.conection);
          const resultado = await request.query(`SELECT COUNT(*) AS cantidad FROM Actividad`);

          const cantActividades = resultado.recordset[0].cantidad;         
          return `${cantActividades + 1}`;

        }catch(error) {
          console.error("error al recuperar la cantidad de actividades", error)
        }

      }
}
  module.exports = ActividadDAO;