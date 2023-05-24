import { React, useState, useEffect } from 'react'
import axios from "axios";


import {
    TextField,
    MenuItem,
    Grid,
    Card,
    IconButton,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import { Input } from 'reactstrap';

export default function RegistrarProfes() {

    const [showPassword, setShowPassword] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertaU, setAlertU] = useState(false);
    const [showAlertExito, setShowAlertExito] = useState(false);

    const [idSede, setIdSede] = useState('');
    const [foto, setFoto] = useState(null);
    const [fotoOriginal,setFotoOriginal] = useState(null);
    const [form, setForm] = useState({
        cedula: '',
        nombre: '',
        segundoNombre: '',
        apellido1: '',
        apellido2: '',
        correo: '',
        celular: '',
        clave: '',
        clave2: '',
        idSede: '',
        telOficina: '',
        foto: foto

    });

    const formLimpio = {
        cedula: '',
        nombre: '',
        segundoNombre: '',
        apellido1: '',
        apellido2: '',
        correo: '',
        celular: '',
        clave: '',
        clave2: '',
        idSede: '',
        telOficina: ''
    }

    const apiURI = "http://localhost:4000/profesores"
    const apiURIUsers = "http://localhost:4000/usuarios"

    const alertContent = (msj) => (
        <MDTypography variant="body2" color="white">
            {msj}
        </MDTypography>
    );

    const handleChange = e => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
        console.log(form);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChangeSede = (event) => {
        setIdSede(event.target.value);
        handleChange(event);
    };

    const handleChangeFoto = (event) => {
        if (event.target.files.length > 0) {
            const foto = event.target.files[0];
            setFotoOriginal(foto);
            setFoto(URL.createObjectURL(foto));
        }
        else {
            setFoto(null);
        }

    }

    const validarTelefono = () => {
        const regex = /^\d{4}-\d{4}/;
        if ((!regex.test(form.telOficina) || form.telOficina.length > 9) && form.telOficina != "") return true;
        return false;
    };

    const validarCedula = () => {

        if ((isNaN(form.cedula) || form.cedula.length != 9) && form.cedula != "") {
            return true;
        }
        return false
    }

    const validarStrings = (string) => {
        const numeros = /\d/;

        if (numeros.test(string)&&string!="") return true;

        return false;
    }

    const validarCorreo = () => {
        if (!form.correo.includes("@itcr.ac.cr") && form.correo != "") return true;

        return false;
    }

    const validarCel = () => {
        if ((form.celular.length != 8 || (!form.celular.startsWith("8", 0) && !form.celular.startsWith("7", 0) &&
            !form.celular.startsWith("6", 0))) && form.celular != "")
            return true;

        return false;
    }

    const validarClave = () => {
        if ((isNaN(form.clave) || form.clave.length < 8) && form.clave != "") return true;

        return false;
    }


    const validarConfClave = () => {
        if (form.clave != form.clave2) return true;

        return false;
    }

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showAlert]);


    const existenciaProfesor = async () => {
        try {
            const response = await axios.get(apiURIUsers + "/" + form.cedula);
            const usuario = response.data;
            if (usuario && Object.keys(usuario).length > 0) {
                return true;
            }
            else
                return false;
        } catch (error) {
            console.error(error);
        }

    }
    const procederRegistro = async () => {
        setAlertU(false);
        setShowAlert(false);
        setShowAlertExito(false);
        //Volvemos a validar todos los campos
        if (!validarCedula() && !validarStrings(form.nombre) && !validarStrings(form.segundoNombre) &&
            !validarStrings(form.apellido1) && !validarStrings(form.apellido2) && !validarCorreo() &&
            !validarCel() && !validarClave() && !validarConfClave() && !validarTelefono()) {
            if (form.cedula != "" && form.nombre != "" && form.apellido1 != "" && form.apellido2 != "" &&
                form.celular != "" && form.clave != "" && form.clave2 != "" && form.idSede != "" && form.correo != "" &&
                form.telOficina != "") {

                try {
                    //VERIFICAMOS SI EL PROFESOR YA EXISTE

                    if (await existenciaProfesor()) {
                        setAlertU(true);
                        return false;
                    }

                    const formData = new FormData();
                    formData.append('cedula', form.cedula);
                    formData.append('esCordinador', "0");
                    formData.append('nombre', form.nombre);
                    formData.append('segundoNombre', form.segundoNombre);
                    formData.append('apellido1', form.apellido1);
                    formData.append('apellido2', form.apellido2);
                    formData.append('correo', form.correo);
                    formData.append('clave', form.clave);
                    formData.append('celular', form.celular);
                    formData.append('idSede', form.idSede);
                    formData.append('telOficina', form.telOficina);
                    formData.append('foto', fotoOriginal);

        

                    const response = await axios.post(apiURI, formData);

                    if (response.status == 201) {
                        setShowAlertExito(true);
                        setForm(formLimpio);
                        setFoto(null);
                        setFotoOriginal(null);
                        setIdSede('');
                        return true;
                    }
                    setShowAlert(true);
                    return false;
                } catch (error) {
                    setShowAlert(true);
                    console.error(error);
                }

            }
            else {
                setShowAlert(true);

            }
        }
        setShowAlert(true);
        return false;
    }



    return (
        <DashboardLayout>
            <DashboardNavbar />
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
                                    Formulario
                                </MDTypography>
                            </MDBox>
                            <MDBox p={3}>
                                <form>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="cedula" label="Cédula" value={form.cedula} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarCedula()} helperText={validarCedula() && "Cedula inválida"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="nombre" label="Nombre" value={form.nombre} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarStrings(form.nombre)} helperText={validarStrings(form.nombre) && "Nombre inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="segundoNombre" label="Segundo Nombre" value={form.segundoNombre} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarStrings(form.segundoNombre)} helperText={validarStrings(form.segundoNombre) && "Segundo nombre inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="apellido1" label="Apellido" value={form.apellido1} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarStrings(form.apellido1)} helperText={validarStrings(form.apellido1) && "Apellido inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="apellido2" label="Segundo Apellido" value={form.apellido2} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarStrings(form.apellido2)} helperText={validarStrings(form.apellido2) && "Segundo apellido inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="correo" label="Correo electrónico" value={form.correo} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarCorreo()} helperText={validarCorreo() && "Correo inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="celular" label="Celular" value={form.celular} variant="outlined" fullWidth onChange={handleChange}
                                                error={validarCel()} helperText={validarCel() && "Celular inválido"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name='clave'
                                                value={form.clave}
                                                fullWidth
                                                label="Contraseña"
                                                type={showPassword ? 'text' : 'password'}
                                                variant="outlined"
                                                onChange={handleChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton edge="end" onClick={handleClickShowPassword}>
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                error={validarClave()} helperText={validarClave() && "Contraseña debe ser númerica de 8 dígitos"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="clave2"
                                                value={form.clave2}
                                                fullWidth
                                                label="Confirmar Contraseña"
                                                type={showPassword ? 'text' : 'password'}
                                                variant="outlined"
                                                onChange={handleChange}
                                                InputProps={{
                                                    endAdornment: (
                                                        <IconButton edge="end" onClick={handleClickShowPassword}>
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    ),
                                                }}
                                                error={validarConfClave(form.clave2)} helperText={validarConfClave(form.clave2) && "Contraseñas no coinciden"} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
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
                                                InputProps={{
                                                    style: {
                                                        paddingTop: '14px',
                                                        paddingBottom: '14px',
                                                    },
                                                }}
                                            >
                                                <MenuItem value="1">Cartago</MenuItem>
                                                <MenuItem value="2">San José</MenuItem>
                                                <MenuItem value="3">Alajuela</MenuItem>
                                                <MenuItem value="4">Limón</MenuItem>
                                                <MenuItem value="5">San Carlos</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name='telOficina'
                                                value={form.telOficina}
                                                onChange={handleChange}
                                                fullWidth
                                                label="Teléfono de Oficina"
                                                variant="outlined"
                                                error={validarTelefono()}
                                                helperText={
                                                    validarTelefono() &&
                                                    'El formato debe ser NNNN-NNNN'
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Input id="idFoto" label="Foto" variant="outlined" fullWidth type='file' accept="image/*" hidden onChange={handleChangeFoto} />
                                            <label htmlFor='idFoto'>
                                                <MDButton size="small" variant="contained" color="dark" component="span" >Seleccionar foto de perfil</MDButton>
                                            </label>
                                            {foto && (
                                                <MDBox>
                                                    <img
                                                        src={foto}
                                                        alt="Foto seleccionada"
                                                        style={{ borderRadius: "50%", width: "100px", height: "100px" }}
                                                    />
                                                </MDBox>
                                            )}
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MDButton variant="contained" color="primary" onClick={() => procederRegistro()}>
                                                Registrar Profesor
                                            </MDButton>
                                        </Grid>
                                    </Grid>
                                </form>
                                {showAlert && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bottom: "5rem" }}>
                                        <MDAlert color="primary" dismissible>
                                            {alertContent("Datos incorrectos. Revisa si hay algún campo vacío o erróneo")}
                                        </MDAlert>
                                    </div>
                                )}
                                {showAlertExito && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bottom: "5rem" }}>
                                        <MDAlert color="info" dismissible>
                                            {alertContent("Profesor creado exitosamente")}
                                        </MDAlert>
                                    </div>

                                )}
                                {alertaU && (
                                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', bottom: "5rem" }}>
                                        <MDAlert color="primary" dismissible>
                                            {alertContent("Error: Usuario ya existe")}
                                        </MDAlert>
                                    </div>

                                )}
                            </MDBox>

                        </Card>

                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
