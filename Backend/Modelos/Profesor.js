class Profesor{
    constructor(cedula,codigo,esCordinador,nombre,segundoNombre, apellido1, apellido2, correo, clave, celular, rol,idSede,telOficina,foto) {
        this.cedula = cedula;
        this.codigo = codigo;
        this.esCordinador = esCordinador;
        this.nombre = nombre;
        this.segundoNombre = segundoNombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.clave = clave;
        this.celular = celular;
        this.rol = rol;
        this.idSede = idSede;
        this.telOficina = telOficina;
        this.foto = foto;
      }
}

module.exports = Profesor;