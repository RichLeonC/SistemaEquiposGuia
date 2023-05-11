const Estudiante = require('../Modelos/Estudiante.js');
const EstudianteDAO = require("../DAO/EstudianteDAO.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const estudianteDAO = new EstudianteDAO();



//GET -> localhost:4000/estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await estudianteDAO.getAllEstudiantes();
    res.status(200).json(estudiantes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los estudiantes");
  }

});

//GET -> localhost:4000/estudiantes/:carne (estudiantes/2020127158, por ejemplo)
router.get('/:carne', async (req, res) => {
  try {
    const { carne } = req.params;
    const estudiante = await estudianteDAO.getEstudianteCarne(carne);
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener al estudiante por canre");
  }

});


//GET -> localhost:4000/estudiantes/:sede (estudiantes/Cartago, por ejemplo)
router.get('/:sede', async (req, res) => {
  try {
    const { idSede } = req.params;
    const estudiante = await estudianteDAO.getEstudianteSede(idSede);
    res.status(200).json(estudiante);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener a los estudiantes por sede");
  }

});

//PUT ->localhost:4000/estudiantes/:sede/:carnet (estudiantes/Cartago/2020127158, por ejemplo)
router.put('/:sede/:carnet', async (req, res) => {
  try {

    const {carne, cedulaEstudiante, codigoCarrera, idSede, generacion} = req.params;
    console.log(carne);
    if (!carne) {
      return res.status(400).send('Introduzca el carne del estudiante');
    }

    await EstudianteDAO.actualizarEstudiante(carne, cedulaEstudiante, codigoCarrera, idSede, generacion);

    res.status(200).send('Estudiante actualizado exitosamente');
  } catch (error) {
    res.status(500).send('Error al actualizar el estudiante del usuario');
  }
});


async function generarExcel( idSede) {
  console.log("Sede: "+idSede);

  try {
    var fs = require('fs');
    var writeStream = fs.createWriteStream("file.xls");
    
    var header="cedulaEstudiante"+"\t"+" carne"+"\t"+"codigoCarrera"+"\t"+"idSede"+"\t"+"generacion"+"\n";
    writeStream.write(header);

    const estudiantes = await estudianteDAO.getEstudianteSede(idSede);
    var row1 = "0"+"\t"+" 21"+"\t"+"Rob"+"\n";
    var row2 = "1"+"\t"+" 22"+"\t"+"bob"+"\n";
    
    writeStream.write(header);

    for(let i=0; i < estudiantes.length; i++){
      var row = estudiantes[i].cedulaEstudiante+"\t"+estudiantes[i].carne+"\t"+estudiantes[i].codigoCarrera+"\t"+estudiantes[i].idSede+"\t"+estudiantes[i].generacion+"\n";
      writeStream.write(row);
    }

    writeStream.close();
    console.log("Excel generado exitosamente")

  } catch (error) {
    console.error("Error al generar el Excel ", error);
  }
}

module.exports = router;
