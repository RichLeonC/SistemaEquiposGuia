const express = require('express');
const morgan = require("morgan");
const cors = require("cors");
const app = express();

const usuariosRoute = require("./Controladores/UsuarioController");

//Settings
app.set('port',process.env.PORT || 4000);

app.use(express.json());
app.use(morgan("common"));
app.use(cors());


//Rutas

app.use("/usuarios",usuariosRoute);

app.listen(app.get('port'),()=>{ //Va abrir el server en el puerto 4000
    console.log('Server on port',app.get('port'));
})


