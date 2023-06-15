import React, { useEffect, useState } from 'react'

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";
import axios from 'axios';
import { Modal, Box, TextField, MenuItem, Alert } from "@mui/material";

export default function Notificaciones() {

  const [dataNotificaciones, setDataNotificaciones] = useState([]);
  const [estado,setEstado] = useState('');
  const [alertExito,setAlertExito] = useState(false);

  const apiURINotificaciones = "http://localhost:4000/notificaciones";

  const handleChangeEstado=(e)=>{
    setEstado(e.target.value);
    filtrarPorEstado(e.target.value);
  }

  const filtrarPorEstado=async(estado)=>{
    const response = await peticionGetNotificaciones();
    let notificaciones = response;
    notificaciones = notificaciones.filter(n => n.estadoLeido == estado);
    setDataNotificaciones(notificaciones);
  }

  const peticionGetNotificaciones = async () => {
    try {
      const response = await axios.get(`${apiURINotificaciones}/${localStorage.getItem("cedula")}`);
      setDataNotificaciones(response.data);
      return response.data
    } catch (error) {
      console.error(error);
    }
  }

  const cambiarEstado=async(notificacion)=>{
    let nuevoEstado = notificacion.estadoLeido==0?1:0;
    try {
      await axios.put(`${apiURINotificaciones}/cambiarEstado`,{id:notificacion.id,estadoLeido:nuevoEstado});
    } catch (error) {
      console.error(error);
    }
  }

  const desuscribirse =async()=>{
    try {
      await axios.delete(`${apiURINotificaciones}/desuscribir/${localStorage.getItem("cedula")}`);
      setAlertExito(true);
    } catch (error) {
      console.error(error);
    }
  }
  function createRow(notificacion) {
    return {


      id: (
        <MDTypography variant="caption h7" color="text" fontWeight="medium">
          {notificacion.id}
        </MDTypography>
      ),
      emisor: (
        <MDTypography variant="caption h7" color="text" fontWeight="medium">
          {notificacion.emisor}
        </MDTypography>
      ),
      receptor: (
        <MDTypography variant="caption h7" color="text" fontWeight="medium">
          {notificacion.receptor}
        </MDTypography>
      ),
      contenido: (
        <MDTypography variant="caption h7" color="text" fontWeight="medium">
          {notificacion.contenido}
        </MDTypography>
      ),
      fecha: (
        <MDTypography variant="caption h7" color="text" fontWeight="medium">
          {notificacion.fechaHora}
        </MDTypography>
      ),
      action: (

        <MDButton color="dark" size={"small"} onClick={()=>cambiarEstado(notificacion)}
        >Cambiar Estado</MDButton>
      )
    };
  }
  const rows = dataNotificaciones.map(createRow);
  useEffect(() => {
    peticionGetNotificaciones();
    if (alertExito) {
        const timer = setTimeout(() => {
            setAlertExito(false);
        }, 4000);
        return () => clearTimeout(timer);
    }
    // if (alertError) {
    //     const timer = setTimeout(() => {
    //         setAlertError(false);
    //     }, 4000);
    //     return () => clearTimeout(timer);
    // }
  }, [alertExito]);
  const columns = [
    { Header: "Id", accessor: "id", align: "center" },
    { Header: "Emisor", accessor: "emisor", align: "center" },
    { Header: "Receptor", accessor: "receptor", align: "center" },
    { Header: "Contenido", accessor: "contenido", align: "center" },
    { Header: "Fecha", accessor: "fecha", align: "center" },
    { Header: "Acción", accessor: "action", align: "center" },


  ];
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container marginLeft={2}>
        <Grid item xs={12} sm={2} >
          <TextField
            name="idSede"
            select
            labelId="idSede-label"
            id="idSede"
            value={estado}
            onChange={handleChangeEstado}
            label="Estado"
            variant='outlined'
            fullWidth
            style={{ "left": "1rem" }}
            InputProps={{
              style: {
                paddingTop: '14px',
                paddingBottom: '14px',
              },
            }}
          >
            <MenuItem value="0">No Leídas</MenuItem>
            <MenuItem value="1">Leídas</MenuItem>

          </TextField>
        </Grid>
      </Grid>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <MDTypography variant="h6" color="white">
                  Mis Notificaciones
                </MDTypography>
                <MDButton style={{ marginLeft: '900px' }} size="small" color="primary" onClick={()=>desuscribirse()}>Desuscribirse</MDButton>
              </MDBox>
               {alertExito && <Alert style={{ marginLeft: '1100px', marginTop: '5px' }} severity="success">Suscripción cancelada correctamente</Alert>}
                {/* {alertError && <Alert style={{ marginLeft: '1100px', marginTop: '5px' }} severity="error">Ha ocurrido un error</Alert>}  */}
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: columns, rows: rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>


    </DashboardLayout>
  )
}
