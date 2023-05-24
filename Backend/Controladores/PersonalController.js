const Personal = require("../Modelos/Personal.js");
const PersonalDAO = require("../DAO/PersonalDAO.js");
const ListaEstudiantesDAO = require("../DAO/ListaEstudiantesDAO.js");
const ListaEstudiantes = require("../Modelos/ListaEstudiantes.js")
const EstudianteDAO = require("../DAO/EstudianteDAO.js");
const Estudiante = require("../Modelos/Estudiante.js");
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt'); //Hash para encriptar la clave del usuario.
const XLSX = require('xlsx');
const multer = require('multer'); //Middleware para usar el upload.single, sirve para enviar archivos o recibir
const upload = multer({ dest: 'uploads/' });
const blobStorage = require("../BaseDatos/AzureBlobStorage.js");
const fs = require('fs'); //Lo vamos a utlizar para borrar los files que se crean en la carpeta uploads.
const moment = require('moment-timezone'); 
const miZonaHoraria = 'America/Costa_Rica'; 

const listaEstudiantesDAO = new ListaEstudiantesDAO();
const personalDAO = new PersonalDAO();
const estudianteDAO = new EstudianteDAO();

//GET -> localhost:4000/asistentes/:cedula
router.get('/:cedula', async (req, res) => {
    try {
        const { cedula } = req.params;
        const asistente = await personalDAO.getAsistente(cedula);
        res.status(200).json(asistente);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener el asistente");
    }

});

//GET -> localhost:4000/asistentes/registros
router.get('/registros/get', async (req, res) => {
    try {
        const registros1 = await listaEstudiantesDAO.getRegistros();
        res.status(200).json(registros1);
    } catch (error) {
        res.status(500).send("Error al obtener los registros");

    }

});

//POST -> localhost:4000/asistentes/crearRegistro
router.post('/crearRegistro', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No se ha adjuntado el archivo excel");
        }
        const { cedulaPersonal } = req.body;
        const fecha = moment().tz(miZonaHoraria).format('YYYY-MM-DD HH:mm:ss');

        //Leemos el excel
        const workbook = XLSX.readFile(req.file.path);
        const sheet_name_list = workbook.SheetNames;
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

        //Insertamos los datos en la base de datos
        data.forEach(async (row) => {
            const salt = await bcrypt.genSalt(10);
            const claveEncriptada = await bcrypt.hash(row.carne.toString(), salt);
            const estudiante = new Estudiante(row.cedulaUsuario, row.nombre, row.segundonombre, row.apellido1, row.apellido2,
                row.correo, claveEncriptada, row.celular, "ESTUDIANTE", row.carne, row.codigoCarrera, row.idSede, row.generacion);
            await estudianteDAO.crearEstudiante(estudiante);
        });

        const excelURI = await blobStorage.subirArchivoABlobStorage('documentos-sistemaguia', req.file);
        fs.unlinkSync(req.file.path);
        await listaEstudiantesDAO.crearRegistroArchivo(new ListaEstudiantes(null, cedulaPersonal, excelURI, fecha));
        //Subimos el archivo al blobStorage
        return res.status(200).send("Registro creado correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Ha ocurrido un error");
    }
})

//DELETE -> localhost:4000/asistentes/eliminarRegistro/:idArchivo
router.delete('/eliminarRegistro/:idArchivo', async (req, res)=>{
    
    try {
        const {idArchivo} = req.params;
        await listaEstudiantesDAO.eliminarRegistro(idArchivo);
        return res.status(200).send("Registro eliminado correctamente");
    } catch (error) {
        res.status(500).send("No se pudo eliminar el registo");
    }
});

module.exports = router;