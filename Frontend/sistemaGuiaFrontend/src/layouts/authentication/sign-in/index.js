
import { useState } from "react";
import axios from "axios";

import SignUp from "../sign-up/index";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDAlert from "components/MDAlert";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import routesProfesor from "routesProfesor";

function Basic({ onLogin }) {
  const [rememberMe, setRememberMe] = useState(false);

  const apiURI = "http://localhost:4000/usuarios/login";
  const apiURISub = "http://localhost:4000/notificaciones/suscribir";


  const [form, setForm] = useState({
    correo: '',
    clave: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
    console.log(form);
  }
  const suscribirUsuario = async(cedula)=>{
    try {
        await axios.post(`${apiURISub}/${cedula}`);
    } catch (error) {
      console.error(error);
        }
  }

  const iniciarSesion = async () => {
    try {
      const response = await axios.post(apiURI, { correo: form.correo, clave: form.clave });
      const { correo,cedula,nombre, token, rol } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('correo', correo);
      localStorage.setItem('nombre', nombre);
      localStorage.setItem('cedula', cedula);
      localStorage.setItem('rol', rol);

      console.log(correo);
      console.log(token);
      console.log(rol);
      alert(`Bievenido ${nombre}`);
      suscribirUsuario(cedula);
      onLogin(rol);
      

    } catch (error) {
      alert("Correo o contraseña incorrectas");
      console.log("Error al iniciar sesion");
      console.error(error);
    }
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <br />
          <img src="https://tecdigital.tec.ac.cr/images/logoTECBLANCO.png" width={"250rem"}></img>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput name="correo" type="email" label="Correo"fullWidth onChange={handleChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput name="clave" type="password" label="Contraseña" fullWidth onChange={handleChange} />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton color="info" fullWidth onClick={() => iniciarSesion()}>
                Aceptar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Olvidaste la contraseña?{" "}
                <MDTypography
                  component={Link}
                  to="/verificacion"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Recuperar
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
