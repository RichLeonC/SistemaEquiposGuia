

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cover() {

  const correo = localStorage.getItem("correo");
  const apiURI = "http://localhost:4000/usuarios/restablecer";
  const [form,setForm] = useState({
    claveNueva:"",
    reconfirmarClave:""
  });

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    })
    ;
  }

  const restablecerPassword=async()=>{
    try {


      if(form.claveNueva==="" || form.reconfirmarClave===""){
        return alert("Campos no pueden estar vacios");
      }
      else if(isNaN(form.claveNueva)){
        return alert("La contraseña debe ser númerica")
      }
      else if(form.claveNueva != form.reconfirmarClave){
        return alert("Clave son distintas")
      }

      console.log(correo);
      console.log(form.claveNueva);
      const response = await axios.put(apiURI,{correo:correo,claveNueva:form.claveNueva});

      if(response.status == 200){
        localStorage.removeItem("correo");
        alert("Contraseña actualizada correctamente");
        return navigate("/");
      }

    } catch (error) {
      console.error(error);
    }
  }


  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Restablecer Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Digite la nueva contraseña
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput name="claveNueva" type="password" label="Nueva contraseña" variant="standard" fullWidth onChange={handleChange}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput name="reconfirmarClave" type="password" label="Confirmar contraseña" variant="standard" fullWidth  onChange={handleChange} />
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton  color="info" fullWidth onClick={()=>restablecerPassword()}>
                Restablecer
              </MDButton>
            </MDBox>

          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
