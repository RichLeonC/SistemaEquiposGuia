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
        height: 250,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: '15px',
        p: 4,
    };

    const [dataEquipos, setDataEquipos] = useState([]);
    const [dataProfes, setDataProfes] = useState([]);
    const [dataCoordinador, setDataCoordinador] = useState([]);
    const [modalProfe, setModalProfe] = useState(false);
    const [modalCoordinador, setModalCoordinador] = useState(false);
    const [selectedProfe, setSelectedProfe] = useState('');
    const [equipoActual, setEquipoActual] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [asistenteActual, setAsistenteActual] = useState([]);
    const [profesPorSede, setProfesPorSede] = useState([]);
    const [profesTablas, setProfesTablas] = useState([]);
    const [allProfes, setAllProfes] = useState([]);
    const [profesGeneracion, setProfesGeneracion] = useState([]);


    const alertContent = (msj) => (
        <MDTypography variant="body2" color="white">
            {msj}
        </MDTypography>
    );
    const apiURIEquipos = "http://localhost:4000/equipos";
    const apiURi = "http://localhost:4000"


    const handleModalPC = async (equipo, tipo) => {
        setEquipoActual(equipo);
        peticionGetProfesSinEquipo();
        filtrarProfesPorSede();
        setSelectedProfe('');

        if (tipo == 1) {
            setModalProfe(!modalProfe);
        } else {
            setModalCoordinador(!modalCoordinador);
            filtrasProfesGeneracion(equipo);
        }
    }

    const filtrarProfesPorSede = () => {
        if (asistenteActual.idSede != 1) {
            setProfesPorSede(dataProfes.filter(p => p.idSede == asistenteActual.idSede));

        }
        else {
            setProfesPorSede(dataProfes);
        }
    }

    const filtrasProfesGeneracion = (equipo) => {
        if(profesTablas && allProfes){
            const profesGenActual = profesTablas.filter(p => p.generacion == equipo.generacion);
            const profesCompletos = allProfes.filter(p => profesGenActual.some(pg => pg.idProfesor == p.codigo));
            setProfesGeneracion(profesCompletos);
        }

    }

    const hayProfesores=(equipo)=>{

        let profesCompletos = [];
        if(profesTablas && allProfes){
            const profesGenActual = profesTablas.filter(p => p.generacion == equipo.generacion);
            profesCompletos = allProfes.filter(p => profesGenActual.some(pg => pg.idProfesor == p.codigo));
        }

        if(profesCompletos.length>0) return true

        return false;
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
            handleModalPC(null, 1);
            return true;
        } catch (error) {
            alert("No se puede agregar el profesor al equipo")
        }

    }

    const definirCoordinador=async()=>{
        if (!selectedProfe) {
            alert("Debe seleccionar algun profesor");
            return false;
        }

        try {
            console.log(selectedProfe,equipoActual.generacion);
            await axios.put(`${apiURIEquipos}/definirCoordinador`, { idProfesor: selectedProfe, generacion: equipoActual.generacion });
            handleModalPC(null, 0);
            return true;
        } catch (error) {
            alert("No se puede definir el coordinador")
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
        switch (profe.idSede) {
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

        

        const nombreCompleto = `${profe.nombre} ${profe.segundoNombre} ${profe.apellido1} ${profe.apellido2} ${profe.esCordinador==1?"(COORDINADOR)":""}`;
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
                <MDButton disabled={asistenteActual.idSede != profe.idSede && asistenteActual.idSede != 1} color="dark" size={"small"}>Dar de Baja</MDButton>
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
                        let rows = [];
                        if(profesTablas && allProfes){
                            const profesGenActual = profesTablas.filter(p => p.generacion == equipo.generacion);
                            const profesCompletos = allProfes.filter(p => profesGenActual.some(pg => pg.idProfesor == p.codigo))
                            .sort((a, b) => b.esCordinador - a.esCordinador);
                            rows = profesCompletos.map(createRow);
                        }


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
                                        <MDButton size="small" color="primary" style={{ marginLeft: '900px' }}
                                            disabled={asistenteActual.idSede != 1 || !hayProfesores(equipo)} onClick={() => handleModalPC(equipo, 0)}
                                        >Definir Coordinador</MDButton>
                                        <MDButton size="small" color="primary" onClick={() => handleModalPC(equipo, 1)} >Agregar Profesor</MDButton>

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
                open={modalProfe || modalCoordinador}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', position: 'absolute', width: 400, height: 250, backgroundColor: 'white', padding: '20px' }}>
                        <MDTypography variant="h8" >Seleccionar para equipo guía: {equipoActual && equipoActual.generacion}</MDTypography>
                        <br></br>
                        <br></br>
                        <TextField
                            select
                            label={modalProfe ? "Profesor" : "Coordinador"}
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
                            {modalProfe
                                ? profesPorSede.map((profe, index) =>
                                    <MenuItem value={profe.codigo}>{profe.codigo} - {profe.nombre} {profe.apellido1}</MenuItem>
                                )
                                : profesGeneracion.map((profe, index) =>
                                    <MenuItem value={profe.codigo}>{profe.codigo} - {profe.nombre} {profe.apellido1}</MenuItem>
                                )
                            }
                        </TextField>
                        <br></br>
                        <MDButton style={{ top: "60px" }} size={"small"} color="primary" onClick={() => modalProfe?agregarProfes():definirCoordinador()}>Aceptar</MDButton>
                        <MDButton style={{ top: "60px", left: "10px" }} size={"small"} color="primary" onClick={() => modalProfe ? setModalProfe(false) : setModalCoordinador(false)}>Cancelar</MDButton>

                    </div>

                </Box>

            </Modal>

        </DashboardLayout>

    )
}
