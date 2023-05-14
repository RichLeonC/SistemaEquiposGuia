const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();
require('dotenv').config(); //El dotenv es para poder utilizar el archivo .env (variables de entorno)
<<<<<<< HEAD
<<<<<<< refs/remotes/origin/main
const usuariosRoute = require("./Controladores/UsuarioController");
const profesoresRoute = require("./Controladores/ProfesoresController")
=======
const estudiantesRoute = require("./Controladores/EstudiantesController");
>>>>>>> Backend Andres
=======
const estudiantesRoute = require("./Controladores/EstudiantesController");
>>>>>>> Andres

//Settings
app.set('port',process.env.PORT || 4000);

app.use(express.json());
app.use(morgan("common"));
app.use(cors());


//Rutas

<<<<<<< HEAD
<<<<<<< refs/remotes/origin/main
app.use("/usuarios",usuariosRoute);
app.use("/profesores",profesoresRoute);
=======
app.use("/estudiantes",estudiantesRoute);
>>>>>>> Backend Andres
=======
app.use("/estudiantes",estudiantesRoute);
>>>>>>> Andres

app.listen(app.get('port'),()=>{ //Va abrir el server en el puerto 4000
    console.log('Server on port',app.get('port'));
})



