class Usuario {
    constructor(cedula, nombre,segundoNombre, apellido1, apellido2, correo, clave, celular, rol) {
      this.cedula = cedula;
      this.nombre = nombre;
      this.segundoNombre = segundoNombre;
      this.apellido1 = apellido1;
      this.apellido2 = apellido2;
      this.correo = correo;
      this.clave = clave;
      this.celular = celular;
      this.rol = rol;
    }
  }
  
  module.exports = Usuario;
  