

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
import { Modal} from "@mui/material";

function Cover() {
  const [modalOtp, setModalOtp] = useState(false);

  const abrirCerrarModalOpt = () => {
    setModalOtp(!modalOtp);
  }

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
              <MDInput name="correo" type="email" label="Correo" variant="standard" fullWidth />
            </MDBox>
            <MDBox mt={6} mb={1}>
              <MDButton color="info" fullWidth>
                Enviar
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>

      {/* <Modal isOpen={modalOtp}>
        <ModalBody>
          Digita el código recibido
        </ModalBody>
        <ModalFooter>
          <MDButton color="info" size="sm" >Sí</MDButton>
        </ModalFooter>
      </Modal> */}
    </CoverLayout>
  );
}

export default Cover;
