const Usuario = require('../Modelos/Usuario.js');
const UsuarioDAO = require("../DAO/UsuarioDAO.js");
const express = require("express");
const router = express.Router();
const Rol = require('../Modelos/Rol.js');
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.
const jwt = require("jsonwebtoken");

const usuarioDAO = new UsuarioDAO();



//GET -> localhost:4000/usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await usuarioDAO.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener los usuaarios");
  }

});

//GET -> localhost:4000/usuarios/:cedula (usuarios/118180009, por ejemplo)
router.get('/:cedula', async (req, res) => {
  try {
    const { cedula } = req.params;
    const usuario = await usuarioDAO.getUsuario(cedula);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener al usuario");
  }

});

//GET -> localhost:4000/usuarios/correo/:correo
router.get('/correo/:correo', async (req, res) => {
  try {
    const { correo } = req.params;
    const usuario = await usuarioDAO.getUsuario_Correo(correo);
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro al obtener al usuario");
  }

});

// POST -> localhost:4000/usuarios
router.post('/', async (req, res) => {
  try {
    const { cedula, nombre, segundoNombre, apellido1, apellido2, correo, clave, celular, rol } = req.body;

    // Validamos los datos de entrada
    if (!cedula || !nombre || !apellido1 || !apellido2 || !correo || !clave || !celular || !rol) {
      return res.status(400).send('Todos los campos son obligatorios, excepto segundoNombre.');
    }

    const nuevoUsuario = new Usuario(cedula, nombre, segundoNombre, apellido1, apellido2, correo, clave, celular, rol);
    await usuarioDAO.crearUsuario(nuevoUsuario);

    return res.status(201).send('Usuario creado exitosamente.');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error al crear el usuario.');
  }
});

//POST -> localhost:4000/usuarios/login  (LOGIN)
router.post('/login', async (req, res) => {
  const { correo, clave } = req.body;

  if (!correo.includes("@estudiantec.cr") && !correo.includes("@itc.cr")) {
    return res.status(401).send("Correo invalido");
  }

  const usuario = await usuarioDAO.getUsuario_Correo(correo);
  const claveCorrecta = usuario === null ? false : await bcrypt.compare(clave, usuario.clave); //Verificamos si el usuario existe y comparamos las contrasenias

  if (!(usuario && claveCorrecta)) {
    return res.status(401).send("Correo o contraseña incorrectos");
  }

  const infoToken = { //Guardamos en el token la informacion mas importante del usuario
    cedula: usuario.cedula,
    correo: usuario.correo,
    rol: usuario.rol
  }

  const token = jwt.sign(infoToken, process.env.DB_PASSWORD); //Firmamos el token con una palabra secreta.

  return res.header('authorization', token).json({
    correo: usuario.correo,
    token
  })


});

//MIDDLEWARE
function validarToken(req, res){
  const token = req.header['authorization'];
  if (!token) {
    return res.send("Acceso denegado");
  }
  jwt.verify(token, process.env.DB_PASSWORD, (error, usuario) => {
    if (error) {
      return res.status(403).send("Acceso denegado, token incorrecto");
    }
    else {
      res.status(200).json({msg:"Acceso aceptado",usuario:usuario});
    }
  })
}





//PUT ->localhost:4000/usuarios/:cedula/:rolNuevo (usuarios/118180009/Profesor, por ejemplo)
router.put('/:cedula/:rolNuevo', async (req, res) => {
  try {

    const { cedula, rolNuevo } = req.params;
    console.log(rolNuevo);
    if (!cedula || !rolNuevo) {
      return res.status(400).send('Campos invalidos');
    }
    else if (rolNuevo != Rol.PROFESOR_GUIA || rolNuevo != Rol.PROFESOR_GUIA_COORDINADOR || rolNuevo != Rol.ASISTENTE ||
      rolNuevo != Rol.ESTUDIANTE) {
      return res.status(400).send('Rol invalido');
    }

    await UsuarioDAO.actualizarRol(cedula, rolNuevo);

    res.status(200).send('Rol actualizado exitosamente');
  } catch (error) {
    res.status(500).send('Error al actualizar el rol del usuario');
  }
});

// DELETE -> localhost:4000/usuarios/:cedula
router.delete('/:cedula', async (req, res) => {
  try {
    const cedula = req.params.cedula;

    await usuarioDAO.eliminarUsuario(cedula);

    res.status(200).send('Usuario eliminado exitosamente.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario.');
  }
});

module.exports = router;