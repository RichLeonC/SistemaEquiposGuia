const Actividad = require("../Modelos/Actividad")
const dbSql = require("../BaseDatos/AzureSQLDataBase.js");
const sql = require("mssql");

class ActividadDAO{

 async insertActividad(actividad) {
    const request = new sql.Request(dbSql.conection);

    try {
    const query = `
      INSERT INTO Actividad (codigoActividad, tipoActividad, nombreActividad, fechaInicio, horaInicio, fechaCreacion, modalidad, enlaceReunion, estadoActividad, fechaFinal)
      VALUES (@codigoActividad, @tipoActividad, @nombreActividad, @fechaInicio, @horaInicio, @fechaCreacion, @modalidad, @enlaceReunion, @estadoActividad, @fechaFinal);
    `;
  

        request.input('codigoActividad', actividad.codigoActividad);
        request.input('tipoActividad',actividad.tipoActividad);
        request.input('nombreActividad', actividad.nombreActividad);
        request.input('fechaInicio', actividad.fechaInicio);
        request.input('horaInicio', actividad.horaInicio);
        request.input('fechaCreacion', actividad.fechaCreacion);
        request.input('modalidad', actividad.modalidad);
        request.input('enlaceReunion', actividad.enlaceReunion);
        request.input('estadoActividad', actividad.estadoActividad);
        request.input('fechaFinalizacion', actividad.fechaFinal);

        const result = await request.query(query);

  
      console.log('Actividad insertada con éxito');
    } catch (error) {
      console.error('Error al insertar la actividad:', error);
    }
  }

  async obtenerActividades() {
    try {
      const pool = await sql.connect(dbSql.conection);
      const result = await pool.request().query("SELECT * FROM Actividad");
      return result.recordset;
    } catch (error) {
      console.error("Error al obtener las actividades:", error);
      throw error;
    }
  }
}

  module.exports = ActividadDAO;