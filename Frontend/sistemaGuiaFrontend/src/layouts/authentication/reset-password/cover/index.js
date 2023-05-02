

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";
import { useState } from "react";
import { Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import "../cover/index.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius:'10px',
  p: 4,
};

function Cover() {
  const [modalOtp, setModalOtp] = useState(false);
  const [correo, setCorreo] = useState([]);
  const [OTPinput, setOTPinput] = useState('');
  const [OTPvalid, setOTPvalid] = useState(true);

  const apiURI = "http://localhost:4000/usuarios/correo";
  const apiSendOTP = "http://localhost:4000/usuarios/enviarCorreo";
  const handleChange = e => {
    console.log(correo);
    setCorreo(e.target.value);
  }

  const handleOtpChange = e=>{
    const {value} = e.target;
    if(/^\d{0,6}$/.test(value)){
      setOTPinput(value);
    }
  }

  const abrirCerrarModalOpt = () => {
    setModalOtp(!modalOtp);
  }

  const comprobarCorreo = async () => {

    if (!correo.includes("@estudiantec.cr") && !correo.includes("@itc.cr")) {
      return alert("Correo invalido");
    }
    try {
      const response = await axios.get(apiURI + "/" + correo);
      const usuario = response.data;
      if (usuario) {
        abrirCerrarModalOpt();
        console.log("Correo existe");
        return true;
      }
      else return alert("No existe ningún usuario con ese correo");
    } catch (error) {
      console.error(error);
    }

  }

  const generarOTP = async()=>{
    try {
      const otp = Math.floor(1000+Math.random()*9000);
      const timer = Date.now();
      await axios.post(apiSendOTP,correo,otp);
      return {otp,timer}
    } catch (error) {
      console.error(error);
    }

  }

  const invalidarOTP = ()=>{
    setOTPvalid(false);
    console.log("El OTP ha expirado");
  }

  const verificarOTP=()=>{
    if(OTPinput === otp){
      alert("El codigo OTP es correcto");
      return true;
    }
    else{
      return false;
    }
  }
  setTimeout(invalidarOTP,90*1000);
  const {otp,timer} = generarOTP();



  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={1}>
            Restablecer Contraseña
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Recibirás un código a tu correo eléctronico
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={4}>
              <MDInput name="correo" type="email" label="Correo" variant="standard" fullWidth onChange={handleChange} />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton color="info" fullWidth onClick={() => comprobarCorreo()}>
                Enviar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      <Modal
        open={modalOtp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

            <div className="otp-input-container">
              <input
                className="otp-input"
                type="text"
                maxLength="4"
                value={OTPinput}
                onChange={handleOtpChange}
                placeholder="Ingrese OTP"
              />
            </div>
      
          <br></br>
          <MDButton color="info" onClick={() => abrirCerrarModalOpt()}>Verificar</MDButton>
        </Box>
      </Modal>
    </CoverLayout>
  );
}

export default Cover;
