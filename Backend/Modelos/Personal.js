class Personal {

    constructor(cedula, nombre, segundoNombre, apellido1, apellido2, correo, celular, rol, idSede, telOficina, foto) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.segundoNombre = segundoNombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.correo = correo;
        this.celular = celular;
        this.rol = rol;
        this.idSede = idSede;
        this.telOficina = telOficina;
        this.foto = foto;
    }

}

module.exports = Personal;