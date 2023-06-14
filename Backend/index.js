const express = require('express');
const morgan = require("morgan");
const cors = require("cors");


const app = express();
require('dotenv').config(); //El dotenv es para poder utilizar el archivo .env (variables de entorno)

// Routes
const usuariosRoute = require("./Controladores/UsuarioController");
const profesoresRoute = require("./Controladores/ProfesoresController")
const estudiantesRoute = require("./Controladores/EstudiantesController");
const equiposRoute = require("./Controladores/EquipoGuiaController");
const personalRoute = require("./Controladores/PersonalController");
const actividadRoute = require("./Controladores/ActividadesController");
const comentarioRoute = require("./Controladores/ComentariosController");
const notificacionesRoute = require("./Controladores/NotificacionesController");
const chatRoute = require("./Controladores/ChatController");


//Settings
app.set('port',process.env.PORT || 4000);

app.use(express.json());
app.use(morgan("common"));
app.use(cors());


//Rutas

app.use("/usuarios",usuariosRoute);
app.use("/profesores",profesoresRoute);
app.use("/estudiantes",estudiantesRoute);
app.use("/equipos",equiposRoute);
app.use("/asistentes",personalRoute);
app.use("/actividades",actividadRoute);
app.use("/comentarios",comentarioRoute);
app.use("/notificaciones",notificacionesRoute);
app.use("/chat",chatRoute);


app.listen(app.get('port'),()=>{ //Va abrir el server en el puerto 4000
    console.log('Server on port',app.get('port'));
})



