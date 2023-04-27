const Usuario = require('../Modelos/Usuario.js');
const UsuarioDAO = require("../DAO/UsuarioDAO.js");
const express = require("express");
const router = express.Router();

const usuarioDAO  = new UsuarioDAO();

//GET -> localhost::4000/usuarios
router.get('/'),(req,res)=>{
    try{
        const usuarios = usuarioDAO.getAllUsuarios();
        res.status(200).json(usuarios);
    }catch(error){
        console.error(error);
        res.status(500).send("Erro al obtener los usuaarios");
    }

}

module.exports = router;