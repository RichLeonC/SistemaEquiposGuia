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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import _ from 'lodash';

export default function ConsultarEstudiantes() {

    const [dataEstudiantes, setDataEstudiantes] = useState([]);
    const [profesorActual, setProfesorActual] = useState([]);
    const [carneFiltro, setCarneFiltro] = useState("");
    const [idSede, setIdSede] = useState('');
    const [alertExito, setAlertExito] = useState(false);
    const [alertError, setAlertError] = useState(false);

    const apiURIEstudiantes = "http://localhost:4000/estudiantes";
    const apiURIProfesores = "http://localhost:4000/profesores";


    const handleChangeCarne = (e) => {
        const value = e.target.value;
        const regex = /^[0-9\b]+$/; // Expresión regular para permitir solo números

        if (value === "") {
            setCarneFiltro(value);
            peticionGetEstudiantes();
        }
        if ((regex.test(value)) && value.length <= 10) {
            setCarneFiltro(value);
            filtrarPorCarne(value);

        }
    }

    const handleChangeSede = (event) => {
        setIdSede(event.target.value);
        // peticionGetEstudiantes();
        filtrarPorSede(event.target.value);

    };

    const filtrarPorCarne = (carne) => {

        const estudiantes = dataEstudiantes;
        let estudianteCarne = estudiantes.filter(e => e.carne == carne);
        if (estudianteCarne.length > 0) {
            setDataEstudiantes(estudianteCarne);
        }

    }

    const filtrarPorSede = async (idSede) => {
        const response = await peticionGetEstudiantes();
        let estudiantes = response;
        if (idSede != 0) {
            estudiantes = estudiantes.filter(e => e.idSede == idSede);
        }
        setDataEstudiantes(estudiantes);
    }

    const peticionGetEstudiantes = async () => {
        try {
            const response = await axios.get(apiURIEstudiantes);
            setDataEstudiantes(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    const peticionGetProfesorActual = async () => {
        try {
            const response = await axios.get(apiURIProfesores + "/" + localStorage.getItem("cedula"));
            setProfesorActual(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const sedeMap = {
        1: 'Cartago',
        2: 'San José',
        3: 'Alajuela',
        4: 'Limón',
        5: 'San Carlos'
    };

    const generarExcel = (paraMiSede) => {

        try {
            // Crear un libro de trabajo
            const wb = XLSX.utils.book_new();

            // Agrupar los estudiantes por sede
            let estudiantesPorSede;
            let nombreExcel = "";
            console.log(paraMiSede);
            if (paraMiSede) {
                estudiantesPorSede = dataEstudiantes.filter(e => e.idSede == profesorActual.idSede);
                nombreExcel = `estudiantes_sede_${sedeMap[profesorActual.idSede]}.xlsx`
                // Crear una hoja de trabajo para la sede dada
                const ws = XLSX.utils.json_to_sheet(estudiantesPorSede);
                const sedeName = sedeMap[profesorActual.idSede];
                XLSX.utils.book_append_sheet(wb, ws, `Sede ${sedeName}`);
            }
            else {
                estudiantesPorSede = _.groupBy(dataEstudiantes, 'idSede');
                nombreExcel = 'estudiantes_por_sede.xlsx';
                // Crear una hoja de trabajo para cada sede
                _.forEach(estudiantesPorSede, (estudiantes, idSede) => {
                    const ws = XLSX.utils.json_to_sheet(estudiantes);
                    const sedeName = sedeMap[idSede];
                    XLSX.utils.book_append_sheet(wb, ws, `Sede ${sedeName}`);
                });
            }


            // Escribir el libro de trabajo en un ArrayBuffer
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

            // Guardar el ArrayBuffer como un archivo Blob
            const blob = new Blob([wbout], { type: 'application/octet-stream' });

            // Guardar el archivo Blob en el cliente

            saveAs(blob, nombreExcel);

            setAlertExito(true);
            return blob;
        } catch (error) {
            setAlertError(false);
            console.error(error);
        }

    }

    const columns = [
        { Header: "Estudiante", accessor: "author", width: "45%", align: "left" },
        { Header: "Carné", accessor: "carne", align: "left" },
        { Header: "Cédula", accessor: "cedula", align: "center" },
        { Header: "Sede", accessor: "sede", align: "center" },
        { Header: "Carrera", accessor: "carrera", align: "center" },
        { Header: "Celular", accessor: "celular", align: "center" },
        { Header: "Generación", accessor: "generacion", align: "center" },
        { Header: "Acción", accessor: "action", align: "center" },
    ];

    const Author = ({ name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            {/* <MDAvatar src={image} name={name} size="sm" /> */}
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );

    function createRow(estudiante) {
        let sedeP = '';
        switch (estudiante.idSede) {
            case 1:
                sedeP = 'Cartago'
                break;
            case 2:
                sedeP = 'San José'
                break;
            case 3:
                sedeP = 'Alajuela';
                break;
            case 4:
                sedeP = 'Limón';
                break;
            case 5:
                sedeP = 'San Carlos';
                break;
        }


        const nombreCompleto = `${estudiante.nombre} ${estudiante.segundonombre ? estudiante.segundonombre : ""} ${estudiante.apellido1} ${estudiante.apellido2}`;
        return {

            author: <Author name={nombreCompleto} email={estudiante.correo} />,
            carne: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {estudiante.carne}
                </MDTypography>
            ),
            cedula: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {estudiante.cedulaUsuario}
                </MDTypography>
            ),
            sede: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {sedeP}
                </MDTypography>
            ),
            carrera: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {estudiante.codigoCarrera}
                </MDTypography>
            ),
            celular: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {estudiante.celular}
                </MDTypography>
            ),
            generacion: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {estudiante.generacion}
                </MDTypography>
            ),
            action: (

                <MDButton disabled={profesorActual.idSede != estudiante.idSede} color="dark" size={"small"}
                >Editar</MDButton>
            )
        };
    }

    const rows = dataEstudiantes.map(createRow);

    useEffect(() => {
        peticionGetEstudiantes();
        peticionGetProfesorActual();
        filtrarPorCarne();
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
    }, [alertExito, alertError]);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container marginLeft={2}>

                <Grid item xs={12} sm={2}>
                    <TextField name="carne" value={carneFiltro} label="Carné" onChange={handleChangeCarne} variant="outlined" fullWidth />
                </Grid>

                <Grid item xs={12} sm={2} >
                    <TextField
                        name="idSede"
                        select
                        labelId="idSede-label"
                        id="idSede"
                        value={idSede}
                        onChange={handleChangeSede}
                        label="Sede"
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
                        <MenuItem value="0">Todas</MenuItem>
                        <MenuItem value="1">Cartago</MenuItem>
                        <MenuItem value="2">San José</MenuItem>
                        <MenuItem value="3">Alajuela</MenuItem>
                        <MenuItem value="4">Limón</MenuItem>
                        <MenuItem value="5">San Carlos</MenuItem>
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
                                    Estudiantes
                                </MDTypography>
                                <MDButton style={{ marginLeft: '900px' }} size="small" color="primary" onClick={() => generarExcel(false)}>Generar Excel</MDButton>
                                <MDButton size="small" color="primary"
                                    onClick={() => generarExcel(true)}>Generar Excel Mi Sede</MDButton>

                            </MDBox>
                            {alertExito && <Alert style={{ marginLeft: '1100px', marginTop: '5px' }} severity="success">Excel descargado correctamente</Alert>}
                            {alertError && <Alert style={{ marginLeft: '1100px', marginTop: '5px' }} severity="error">Ha ocurrido un error</Alert>}
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
