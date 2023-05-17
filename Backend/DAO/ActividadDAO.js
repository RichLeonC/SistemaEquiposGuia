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
              const actividad = {
                codigo: row.codigoActividad,
                tipo: row.tipoActividad,
                title: row.nombreActividad,
                start: row.fechaInicio,
                horaInicio: row.horaInicio,
                creacion: row.fechaCreacion,
                modalidad: row.modalidad,
                enlace: row.enlaceReunion,
                estado: row.estadoActiviad,
                end: row.fechaFinal
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
}
  module.exports = ActividadDAO;