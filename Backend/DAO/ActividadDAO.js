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