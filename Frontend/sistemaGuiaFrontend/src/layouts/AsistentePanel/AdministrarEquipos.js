import { React, useState, useEffect } from 'react'
import axios from 'axios';
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import MDButton from 'components/MDButton';
import MDAlert from "components/MDAlert";
import { Modal, Box, TextField, MenuItem } from "@mui/material";
import MDAvatar from "components/MDAvatar";
import Icon from "@mui/material/Icon";

export default function AdministrarEquipos() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
    };

    const [dataEquipos, setDataEquipos] = useState([]);
    const [dataProfes, setDataProfes] = useState([]);
    const [dataCoordinador, setDataCoordinador] = useState([]);
    const [modalProfe, setModalProfe] = useState(false);
    const [selectedProfe, setSelectedProfe] = useState('');
    const [equipoActual, setEquipoActual] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [asistenteActual, setAsistenteActual] = useState([]);
    const [profesPorSede, setProfesPorSede] = useState([]);
    const [profesTablas, setProfesTablas] = useState([]);
    const [allProfes, setAllProfes] = useState([]);


    const alertContent = (msj) => (
        <MDTypography variant="body2" color="white">
            {msj}
        </MDTypography>
    );
    const apiURIEquipos = "http://localhost:4000/equipos";
    const apiURi = "http://localhost:4000"

    const handleModalProfe = async (equipo) => {
        setEquipoActual(equipo);
        peticionGetProfesSinEquipo();
        filtrarProfesPorSede();
        setSelectedProfe('');

        setModalProfe(!modalProfe);

    }

    const filtrarProfesPorSede = () => {
        if (asistenteActual.idSede != 1) {
            setProfesPorSede(dataProfes.filter(p => p.idSede == asistenteActual.idSede));

        }
        else {
            setProfesPorSede(dataProfes);
        }
    }

    const peticionGetAsistenteActual = async () => {
        try {
            const response = await axios.get(`${apiURi}/asistentes/${localStorage.getItem("cedula")}`);
            setAsistenteActual(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const peticionGetEquipos = async () => {
        try {
            const response = await axios.get(apiURIEquipos);
            setDataEquipos(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const peticionGetProfesSinEquipo = async () => {
        try {
            const response = await axios.get(apiURi + "/profesores/sinEquipo");
            setDataProfes(response.data);
            filtrarProfesPorSede();
        } catch (error) {
            console.error(error)
        }
    }

    const peticionGetProfes = async () => {
        try {
            const response = await axios.get(apiURIEquipos + "/profesEquipoGuia");
            setProfesTablas(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const peticionGetAllProfes = async () => {
        try {
            const response = await axios.get(`${apiURi}/profesores`);
            setAllProfes(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChangeProfe = e => {
        setSelectedProfe(e.target.value);
    }

    const agregarProfes = async () => {
        // setShowAlert(false);
        if (!selectedProfe) {
            //setShowAlert(true);
            alert("Debe seleccionar algun profesor");
            return false;
        }
        try {
            await axios.post(`${apiURIEquipos}/agregarProfe`, { idProfesor: selectedProfe, generacion: equipoActual.generacion });
            handleModalProfe(null);
            return true;
        } catch (error) {
            alert("No se puede agregar el profesor al equipo")
        }

    }

    const Author = ({ image, name, email }) => (
        <MDBox display="flex" alignItems="center" lineHeight={1}>
            <MDAvatar src={image} name={name} size="sm" />
            <MDBox ml={2} lineHeight={1}>
                <MDTypography display="block" variant="button" fontWeight="medium">
                    {name}
                </MDTypography>
                <MDTypography variant="caption">{email}</MDTypography>
            </MDBox>
        </MDBox>
    );


    const columns = [
        { Header: "Profesor", accessor: "author", width: "45%", align: "left" },
        { Header: "Código", accessor: "codigo", align: "left" },
        { Header: "Cédula", accessor: "cedula", align: "center" },
        { Header: "Celular", accessor: "celular", align: "center" },
        { Header: "Sede", accessor: "sede", align: "center" },
        { Header: "Teléfono Oficina", accessor: "telOficina", align: "center" },
        { Header: "Acción", accessor: "action", align: "center" },
    ];


    function createRow(profe) {
        let sedeP = '';
        switch(profe.idSede){
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
                sedeP='Limón';
                break;
            case 5:
                sedeP = 'San Carlos';
                break;
        }
      
        const nombreCompleto = `${profe.nombre} ${profe.segundoNombre} ${profe.apellido1} ${profe.apellido2}`;
        return {
            
            author: <Author image={profe.foto} name={nombreCompleto} email={profe.correo} />,
            codigo: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {profe.codigo}
                </MDTypography>
            ),
            cedula: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {profe.cedula}
                </MDTypography>
            ),
            celular: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {profe.celular}
                </MDTypography>
            ),
            sede: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {sedeP}
                </MDTypography>
            ),
            telOficina: (
                <MDTypography variant="caption h7" color="text" fontWeight="medium">
                    {profe.telOficina}
                </MDTypography>
            ),
            action: (
                <MDButton color="dark" size={"small"}>Dar de Baja</MDButton>
            )
        };
    }



    useEffect(() => { //Hace efecto la peticion
        peticionGetEquipos();
        peticionGetAsistenteActual();
        peticionGetProfes();
        peticionGetAllProfes();

    }, [equipoActual, profesPorSede, dataProfes])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    {dataEquipos.map((equipo, index) => {
                        const profesGenActual = profesTablas.filter(p=>p.generacion == equipo.generacion);
                        const profesCompletos = allProfes.filter(p=>profesGenActual.some(pg=>pg.idProfesor == p.codigo));
                        console.log(profesCompletos);
                        const rows = profesCompletos.map(createRow);
                       
                        return (
                            <Grid item xs={12} key={index}>

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
                                            {`Tabla del Equipo Guía: ${equipo.generacion}`}
                                        </MDTypography>
                                        <MDButton size="small" color="primary" style={{ marginLeft: '900px' }}>Definir Coordinador</MDButton>
                                        <MDButton size="small" color="primary" onClick={() => handleModalProfe(equipo)} >Agregar Profesor</MDButton>

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
                        )
                    })}
                </Grid>
            </MDBox>

            <Modal
                open={modalProfe}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, height: 250, backgroundColor: 'white', padding: '20px' }}>
                        <MDTypography variant="h8" >Agregar Profesor: {equipoActual && equipoActual.generacion}</MDTypography>
                        <br></br>
                        <br></br>
                        <TextField
                            select
                            label="Profesor"
                            value={selectedProfe}
                            onChange={handleChangeProfe}
                            variant='outlined'
                            fullWidth
                            InputProps={{
                                style: {
                                    paddingTop: '14px',
                                    paddingBottom: '14px',
                                },
                            }}
                        >
                            {profesPorSede.map((profe, index) =>
                                <MenuItem value={profe.codigo}>{profe.codigo} - {profe.nombre} {profe.apellido1}</MenuItem>
                            )}
                        </TextField>
                        <br></br>
                        <MDButton style={{ top: "60px" }} size={"small"} color="primary" onClick={() => agregarProfes()}>Aceptar</MDButton>
                        <MDButton style={{ top: "60px", left: "10px" }} size={"small"} color="primary" onClick={() => setModalProfe(false)}>Cancelar</MDButton>

                    </div>
                    {/* {showAlert && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bottom: "5rem" }}>
                            <MDAlert color="primary" dismissible>
                                {alertContent("Datos incorrectos. Revisa si hay algún campo vacío o erróneo")}
                            </MDAlert>
                        </div>
                    )} */}

                </Box>


            </Modal>

        </DashboardLayout>

    )
}
