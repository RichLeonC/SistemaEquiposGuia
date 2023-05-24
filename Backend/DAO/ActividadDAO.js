const Actividad = require("../Modelos/Actividad")
const Actividad_Responsable = require("../Modelos/Actividad_Responsables")
const Actividad_Cancelada = require("../Modelos/Actividad_Cancelada")
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
  
       // console.log(actividad);
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

  async insertProfesorEncargado(datos){
    const request = new sql.Request(dbSql.conection);

    try{
      const query = `
      INSERT INTO actividad_responsables (idActividad, generacion, idProfesor)
      VALUES (@idActividad, @generacion, @idProfesor);
      `

      request.input('idActividad', sql.Int, datos.idActividad);
      request.input('generacion', sql.Int, datos.generacion);
      request.input('idProfesor', sql.VarChar, datos.idProfesor);

      const result = await request.query(query);

      console.log('Encargado establecido con exito');
    } catch(error){
      console.error('Error al settear al encargado: ', error);
    }
  }

  async insertActividadCancelada(datos){

    
    try{
      const query = `INSERT INTO actividad_cancelada (idActividad, observacion, fecha)
      VALUES (@idActividad, @observacion, @fecha);`
      const request = new sql.Request(dbSql.conection);

      request.input('idActividad', sql.Int, datos.idActividad);
      request.input('observacion', sql.VarChar, datos.observacion);
      request.input('fecha', sql.Date, datos.fecha);

      const result = await request.query(query);

      console.log('Cancelacion añadida con exito');
    } catch(error){
      console.error('Error al settear la cancelacion: ', error);
    }
  }

  
  async insertActividadRecordatorio(datos){
    
    try{
      const query = `INSERT INTO actividad_recordatorio (idActividad, fecha, diasRepeticion)
      VALUES (@idActividad, @fecha, @diasRepeticion);`
      const request = new sql.Request(dbSql.conection);

      request.input('idActividad', sql.Int, datos.idActividad);
      request.input('fecha', sql.Date, datos.fechaPublicacion);
      request.input('diasRepeticion', sql.Int, datos.diasRepeticion);

      const result = await request.query(query);

      console.log('Recordatorio añadida con exito');
    } catch(error){
      console.error('Error al settear la recordatorio: ', error);
    }
  }


  async actualizarEstado(idActividad, estado){
    try {
      const query = `UPDATE actividad set estadoActiviad = @estado WHERE codigoActividad = @idActividad;`
      const request = new sql.Request(dbSql.conection);

      request.input('estado', sql.Int, estado);
      request.input('idActividad', sql.Int, idActividad);

      await request.query(query);
    } catch (error) {
      console.error(error);
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
      
              fechaInicio.setHours(23, 50, 0); // Establecer hora de inicio a las 12 AM, minutos y segundos a 0
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

      async getProfesorResponsable(idActividad){
        try{
            const query = `SELECT * FROM actividad_responsables WHERE idActividad = '${idActividad}'`;
            const request = new sql.Request(dbSql.conection);
            const resultado = await request.query(query);

            if(resultado.recordset.length > 0){
                const row = resultado.recordset[0];
                const responsable = new Actividad_Responsable(
                    row.idActividad,
                    row.generacion,
                    row.idProfesor
                );
            }else{
                return null;
            }
        } catch(error){
            console.error('Error al obtener responsable',error);
        }
    }


    async getProfesorResponsable(idActividad){
      try{
          const query = `SELECT * FROM actividad_responsables WHERE idActividad = '${idActividad}'`;
          const request = new sql.Request(dbSql.conection);
          const resultado = await request.query(query);

          if(resultado.recordset.length > 0){
              const row = resultado.recordset[0];
              const responsable = new Actividad_Responsable(
                  row.idActividad,
                  row.generacion,
                  row.idProfesor
              );
          }else{
              return null;
          }
      } catch(error){
          console.error('Error al obtener responsable',error);
      }
  }

  async getActividadCancelada(idActividad){
    try{
        const query = `SELECT * FROM actividad_cancelada WHERE idActividad = '${idActividad}'`;
        const request = new sql.Request(dbSql.conection);
        const resultado = await request.query(query);

        if(resultado.recordset.length > 0){
            const row = resultado.recordset[0];
            const responsable = new Actividad_Cancelada(
                row.idActividad,
                row.observacion,
                row.fecha
            );
        }else{
            return null;
        }
    } catch(error){
        console.error('Error al obtener actividad cancelada',error);
    }
  }

  async getActividadRecordatorio(idActividad){
      try{
          const query = `SELECT * FROM actividad_recordatorio WHERE idActividad = '${idActividad}'`;
          const request = new sql.Request(dbSql.conection);
          const resultado = await request.query(query);
  
          if(resultado.recordset.length > 0){
              const row = resultado.recordset[0];
              const responsable = new Actividad_recordatorio(
                  row.idActividad,
                  row.observacion,
                  row.fecha
              );
          }else{
              return null;
          }
      } catch(error){
          console.error('Error al obtener actividad cancelada',error);
      }
  }
}
  module.exports = ActividadDAO;