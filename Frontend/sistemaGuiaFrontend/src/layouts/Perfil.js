import React, { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";


// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import axios from 'axios';


export default function Perfil() {

    const [usuario,setUsuario] = useState([]);
  
    const apiURI = "http://localhost:4000/usuarios";
  
    const peticionGetUsuario=async()=>{
      try {
        const response = await axios.get(`${apiURI}/${localStorage.getItem("cedula")}`);
        setUsuario(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(()=>{
        peticionGetUsuario();
    },[])
  return (
    <DashboardLayout>
    <DashboardNavbar />
    <MDBox mb={5} />
    <Header>
      <MDBox mt={5} mb={3}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
            <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
            <ProfileInfoCard
              title="Información Básica"
              info={{
                Cedula:`${usuario.cedula}`,
                Celular: `(506) ${usuario.celular}`,
                Correo: `${usuario.correo}`,
              }}
              social={[
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
              shadow={false}
            />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
          </Grid>
        </Grid>
      </MDBox>

    </Header>

  </DashboardLayout>
  )
}
