import React from 'react'
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
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

export default function CargarEstudiantes() {


    const dummyFileUploadHistory = [
        "Archivo_1.xlsx",
        "Archivo_2.xlsx",
        "Archivo_3.xlsx",
        // Agrega aquí más nombres de archivo de ejemplo
    ];

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
                                <MDButton
                                    variant="contained"
                                    color="primary"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Subir Archivo
                                </MDButton>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardHeader
                                title={<Typography variant="h6">Historial de Archivos Subidos</Typography>}
                            />
                            <CardContent>
                                <MDBox display="flex" justifyContent="space-between" alignItems="center" p={2}>
                                    <TimelineItem
                                        color="success"
                                        icon="notifications"
                                        title="$2400, Design changes"
                                        dateTime="22 DEC 7:20 PM"
                                    />
                                    <MDButton color="primary" size="small">Descargar</MDButton>
                                    <MDButton color="primary" size="small">Eliminar</MDButton>

                                    
                                </MDBox>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            /</DashboardLayout>
    );
}
