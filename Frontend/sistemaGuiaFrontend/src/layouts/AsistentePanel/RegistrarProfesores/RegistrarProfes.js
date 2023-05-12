import { React, useState } from 'react'

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
import MDBox from "components/MDBox";

export default function RegistrarProfes() {

    const [showPassword, setShowPassword] = useState(false);
    const [idSede, setIdSede] = useState('');
    const [form, setForm] = useState({
        cedula:'',
        nombre: '',
        segundoNombre:'',
        apellido1:'',
        apellido2:'',
        correo:'',
        celular:'',
        clave: '',
        idSede:'',
        telOficina:'',
        foto:''

      });

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

    const validarTelefono = (tel) => {
        const regex = /^\d{4}-\d{4}?$/;
        return regex.test(tel);
    };


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
                                            <TextField  name="cedula" label="Cédula" variant="outlined" fullWidth onChange={handleChange} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="nombre" label="Nombre" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="segundoNombre" label="Segundo Nombre" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="apellido1" label="Apellido" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="apellido2" label="Segundo Apellido" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="correo" label="Correo electrónico" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField name="celular" label="Celular" variant="outlined" fullWidth onChange={handleChange}/>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name='clave'
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
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name="confirmarClave"
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
                                            />
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
                                                <MenuItem value="1">San José</MenuItem>
                                                <MenuItem value="2">Cartago</MenuItem>
                                                <MenuItem value="3">Limón</MenuItem>
                                                <MenuItem value="4">Alajuela</MenuItem>
                                                <MenuItem value="5">San Carlos</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                name='telOficina'
                                                handleChange={handleChange}
                                                fullWidth
                                                label="Teléfono de Oficina"
                                                variant="outlined"
                                                error={!validarTelefono(form.telOficina)}
                                                helperText={
                                                    !validarTelefono(form.telOficina) &&
                                                    'El formato debe ser NNNN-NNNN'
                                                }
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Foto" variant="outlined" fullWidth />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MDButton variant="contained" color="primary" type="submit">
                                                Registrar Profesor
                                            </MDButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}
