import React, { useEffect, useState } from 'react'
import { Typography, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import TimelineItem from "examples/Timeline/TimelineItem";
import { Input } from 'reactstrap';
import axios from 'axios';

export default function CargarEstudiantes() {

    const [excel, setExcel] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [asistenteActual, setAsistenteActual] = useState([]);
    const [alertExito, setAlertExito] = useState(false);
    const [alertError, setAlertError] = useState(false);
    const [alertExitoEliminado, setAlertExitoEliminado] = useState(false);
    const linkRef = React.useRef(null);


    const apiURIAsistentes = "http://localhost:4000/asistentes";

    const handleChangeExcel = (event) => {
        if (event.target.files.length > 0) {
            const excel = event.target.files[0];
            setExcel(excel);
        }
        else {
            setExcel(null);
        }
    }

    const nombreExcel = (nombre) => {
        let partes = nombre.split('/');
        let nombreArchivo = partes[partes.length - 1];
        let nombreArchivoSinNumeros = nombreArchivo.replace(/\d+/g, '');
        return nombreArchivoSinNumeros;
    }

    const peticionGetRegistros = async () => {
        try {
            const response = await axios.get(`${apiURIAsistentes}/registros/get`);
            setRegistros(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const peticionGetAsistenteActual = async () => {
        try {
            const response = await axios.get(`${apiURIAsistentes}/${localStorage.getItem("cedula")}`);
            setAsistenteActual(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const registrarArchivo = async () => {
        try {
            const formData = new FormData();
            formData.append('cedulaPersonal', localStorage.getItem("cedula"));
            formData.append('file', excel);
            const response = await axios.post(`${apiURIAsistentes}/crearRegistro`, formData);
            if (response.status === 200) {
                await peticionGetRegistros();
                setAlertExito(true);
                setExcel(null);
                return true;
            }
            setAlertError(true);
            return false;

        } catch (error) {
            setAlertError(true);
            console.error(error);
            return false;
        }
    }

    const descargarExcel = (registro) => {
        const link = linkRef.current;
        link.href = registro.excel;
        link.download = `${nombreExcel(registro.excel)}`;
        link.click();
    }

    const eliminarRegistro = async (registro) => {
        try {
            console.log(registro.idArchivo);
            const response = await axios.delete(`${apiURIAsistentes}/eliminarRegistro/${registro.idArchivo}`);
            if (response.status == 200) {
                await peticionGetRegistros();
                setAlertExitoEliminado(true);
                return true;
            }
            return false;
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (alertExito) {
            const timer = setTimeout(() => {
                setAlertExito(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
        if (alertError) {
            const timer = setTimeout(() => {
                setAlertError(false);
            }, 4000);
            return () => clearTimeout(timer);
        }
        if (alertExitoEliminado) {
            const timer = setTimeout(() => {
                setAlertExitoEliminado(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [alertExito, alertError, alertExitoEliminado]);

    useEffect(() => {
        peticionGetRegistros();
    }, [])
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader
                                title={<MDTypography variant="h6">Subir Documento Excel</MDTypography>}
                            />
                            <CardContent>
                                <Input id="idExcel" label="Excel" variant="outlined" fullWidth type='file' accept=".xlsx" hidden onChange={handleChangeExcel} />
                                <label htmlFor='idExcel'>
                                    <MDButton
                                        variant="contained"
                                        color="dark"
                                        startIcon={<InsertDriveFileIcon></InsertDriveFileIcon>}
                                        component="span"
                                    >
                                        Seleccionar Archivo
                                    </MDButton>
                                </label>
                                <MDButton
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon />}
                                    style={{ "margin-left": "2rem" }}
                                    disabled={excel ? false : true}
                                    onClick={() => registrarArchivo()}
                                >
                                    Subir Archivo
                                </MDButton>
                                {excel && (
                                    <MDBox>
                                        <Typography variant='h7'>{excel.name}</Typography>
                                    </MDBox>
                                )}
                                {alertExito && <Alert severity="success">Excel subido correctamente</Alert>}
                                {alertError && <Alert severity="error">Ha ocurrido un error</Alert>}

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader
                                title={<Typography variant="h6">Historial de Archivos Subidos</Typography>}
                            />
                            <CardContent>
                                {registros.map((r) => (
                                    <MDBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
                                        <TimelineItem
                                            color="success"
                                            icon="payment"
                                            title={`#${r.idArchivo} - ${nombreExcel(r.excel)}`}
                                            dateTime={r.fecha}
                                            description={`Cédula Autor: ${r.cedulaPersonal}`}
                                        />
                                        <MDButton color="primary" size="small"
                                            onClick={() => descargarExcel(r)}>Descargar</MDButton>
                                        <a ref={linkRef} style={{ display: 'none' }}>Descargar</a>
                                        <MDButton color="primary" size="small"
                                            onClick={() => { eliminarRegistro(r); }}
                                            disabled={localStorage.getItem("cedula") == r.cedulaPersonal ? false : true}
                                        >Eliminar</MDButton>
                                       

                                    </MDBox>
                                    
                                ))}
                            {alertExitoEliminado && <Alert severity="success">Excel eliminado correctamente</Alert>}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
