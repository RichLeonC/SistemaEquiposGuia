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

export default function ConsultarEstudiantes() {

    const [dataEstudiantes, setDataEstudiantes] = useState([]);
    const [profesorActual, setProfesorActual] = useState([]);
    const [carneFiltro,setCarneFiltro] = useState("");

    const apiURIEstudiantes = "http://localhost:4000/estudiantes";
    const apiURIProfesores = "http://localhost:4000/profesores";


    const handleChangeCarne=(e)=>{
        const value = e.target.value;
        const regex = /^[0-9\b]+$/; // Expresión regular para permitir solo números

        if(value===""){
            setCarneFiltro(value);
            peticionGetEstudiantes();
        }
        if ((regex.test(value))&&value.length<=10) {
          setCarneFiltro(value);
          filtrarPorCarne(value);
          
        }
    }

    const filtrarPorCarne=(carne)=>{

        const estudiantes = dataEstudiantes;
        let estudianteCarne = estudiantes.filter(e=>e.carne == carne);
        if(estudianteCarne.length>0){
            setDataEstudiantes(estudianteCarne);
        }
        
    }

    const peticionGetEstudiantes = async () => {
        try {
            const response = await axios.get(apiURIEstudiantes);
            setDataEstudiantes(response.data);
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
    }, []);

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <Grid container marginLeft={2}>

                <Grid item xs={10} sm={2}>
                    <TextField name="carne" value={carneFiltro} label="Carné" onChange={handleChangeCarne} variant="outlined" fullWidth/>
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
                            >
                                <MDTypography variant="h6" color="white">
                                    Estudiantes
                                </MDTypography>
                            </MDBox>
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
