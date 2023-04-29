const Usuario = require('../Modelos/Usuario.js');
const UsuarioDAO = require("../DAO/UsuarioDAO.js");
const express = require("express");
const router = express.Router();

const usuarioDAO  = new UsuarioDAO();

//GET -> localhost::4000/usuarios
router.get('/',async (req,res)=>{
    try{
        const usuarios = await usuarioDAO.getAllUsuarios();
        res.status(200).json(usuarios);
    }catch(error){
        console.error(error);
        res.status(500).send("Erro al obtener los usuaarios");
    }

});

router.get('/:cedula',async (req,res)=>{
    try{
        const {cedula} = req.params;
        const usuario = await usuarioDAO.getUsuario(cedula);
        res.status(200).json(usuario);
    }catch(error){
        console.error(error);
        res.status(500).send("Erro al obtener al usuario");
    }

});

module.exports = router;