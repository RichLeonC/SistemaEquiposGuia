class Estudiante {
    constructor(cedulaUsuario,nombre,segundonombre,apellido1,apellido2,correo,clave,celular,rol, carne, codigoCarrera, idSede, generacion) {
      this.cedulaUsuario = cedulaUsuario;
      this.nombre = nombre;
      this.segundonombre = segundonombre;
      this.apellido1 = apellido1;
      this.apellido2 = apellido2;
      this.correo = correo;
      this.clave = clave;
      this.celular = celular;
      this.rol = rol;
      this.carne = carne;
      this.codigoCarrera = codigoCarrera;
      this.idSede = idSede;
      this.generacion = generacion;
    }
  }
  
  module.exports = Estudiante;
  