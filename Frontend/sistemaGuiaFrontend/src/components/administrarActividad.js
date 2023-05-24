import{ useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button  } from 'reactstrap';
import DatePicker from "react-datepicker";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function AdministrarActividad({event}) {


    const tiposEstados = ['Actividad Realizada', 'Actividad Cancelada', 'Establecer Recordatorio'];

    const [fecha, setFecha] = useState(null);
    const [fotoEvidencia, setFotoEvidencia] = useState(null);
    const [fotoParticipantes, setFotoParticipantes] = useState(null);
    const [estado, setEstado] = useState({
        idActividad: event.extendedProps.codigo, //crear la tabla y actualizar estado en la actividad
        estado: '', // 2 -> notificada || 3 -> cancelada || 4 -> realizada
        observacion: '', //justificacion de por qué está cancelada
        fecha: new Date(), //fecha de cancelacion
        fotoEvidencia: fotoEvidencia,
        fotoParticipantes: fotoParticipantes,
        fechaPublicacion: '',
        diasRepeticion: ''
    });


    const [mostrarMotivoCancelacion, setMostrarMotivoCancelacion] = useState(false);
    const [mostrarCampoImagen, setMostrarCampoImagen] = useState(false);
    const [mostrarCampoRecordatorio, setMostrarCampoRecordatorio] = useState(false);

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const estadoOptions = tiposEstados.map((tipo, index) => (
      <option key={index} value={index}>
        {tipo}
      </option>
    ));

    const handleChangeEvidencia = (event) => {
      const foto = event.target.files[0];
    
      if (foto) {
        setEstado((prevEstado) => ({
          ...prevEstado,
          estado:2,
          fotoEvidencia: event.target.files[0],
        }));
      } else {
        setEstado((prevEstado) => ({
          ...prevEstado,
          fotoEvidencia: null,
        }));
      }
    };

    const successMessageStyle = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#dff0d8',
      color: '#3c763d',
      padding: '10px',
      marginBottom: '10px'
    };
  
    const successIconStyle = {
      marginRight: '5px'
    };
  
    const errorMessageStyle = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#f2dede',
      color: '#a94442',
      padding: '10px',
      marginBottom: '10px'
    };
  
    const errorIconStyle = {
      marginRight: '5px'
    };

    const handleChangeParticipantes = (event) => {
      const foto = event.target.files[0];
    
      if (foto) {
        setEstado((prevEstado) => ({
          ...prevEstado,
          estado: 2,
          fotoParticipantes: event.target.files[0],
        }));
      } else {
        setEstado((prevEstado) => ({
          ...prevEstado,
          fotoParticipantes: null,
        }));
      }
    };


    const handleChange = e => {
      const { name, value } = e.target;
      setEstado({
          ...estado,
          [name]: value
      })
      if (value === '1') {
        setMostrarMotivoCancelacion(true);
        setMostrarCampoImagen(false);
        setMostrarCampoRecordatorio(false);
      } else if(value === '0') {
        setMostrarCampoImagen(true);
        setMostrarMotivoCancelacion(false);
        setMostrarCampoRecordatorio(false);
      } else if( value === '2'){
        setMostrarCampoRecordatorio(true);
        setMostrarMotivoCancelacion(false);
        setMostrarCampoImagen(false);

      }else {
        setMostrarMotivoCancelacion(false);
        setMostrarCampoImagen(false);
        setMostrarCampoRecordatorio(false);
      }
  };

  const handleFechaChange = (date) =>{
    setFecha(date);
    setEstado((prevEstado)  => ({
      ...prevEstado,
      fechaPublicacion: date,
    }));
  }

  const handleSubmit = async () => {
    console.log('Estado', estado);
    console.log();
    try{

        const formData = new FormData();
        formData.append('idActividad', estado.idActividad);
        formData.append('estado', estado.estado);
        formData.append('observacion', estado.observacion);
        formData.append('fecha', estado.fecha);
        formData.append('fotoEvidencia', estado.fotoEvidencia);
        formData.append('fotoParticipantes', estado.fotoParticipantes);
        formData.append('fechaPublicacion', estado.fechaPublicacion);
        formData.append('diasRepeticion', estado.diasRepeticion);

        const response = await axios.put('http://localhost:4000/actividades/estadoActividad', formData);
        console.log(response.data);

        setEstado({
          idActividad: event.extendedProps.codigo,
          estado: '',
          observacion: '',
          fecha: new Date(),
          fotoEvidencia: null,
          fotoParticipantes: null,
          fechaPublicacion: '',
          diasRepeticion: '',
        });

        setSuccessMessage('Estado de la actividad actualizado exitosamente');
        setErrorMessage('');
      

    } catch(error){
      console.error('Error al actualizar el estado de la actividad', error);
      setErrorMessage('Ocurrió un error al actualizar el estado de la actividad');
      setSuccessMessage('');
    }
  }


  return (
<>
  <div className="section">Administrar Estado de Actividad</div>
  <div className="section">Estado</div>
  <div className="form-group">
    <select
      className="form-control"
      name="estado"
      id="estado"
      onChange={handleChange}
    >
      <option value="">Seleccione un estado</option>
      {estadoOptions}
    </select>
  </div>

  {mostrarMotivoCancelacion && (
    <div className="form-group">
      <label htmlFor="motivoCancelacion">Motivo de cancelación:</label>
      <textarea
        className="form-control"
        id="motivoCancelacion"
        name="observacion"
        onChange={(e) =>
          setEstado({
            ...estado,
            estado: 3,
            observacion: e.target.value,
          })
        }
      ></textarea>
      <Button color="primary" onClick={handleSubmit}>Guardar Cambios</Button>
    </div>
  )}

  {mostrarCampoImagen && (
    <div className="form-group">
      <label htmlFor="imagenActividad">Subir imagen de la actividad realizada:</label>
      <Input
        type="file"
        id="idFotoEvidencia"
        name="fotoEvidencia"
        onChange={handleChangeEvidencia}           
      />
      <Button color="primary" onClick={handleSubmit}>Guardar Cambios</Button>
    </div>
  )}

  {mostrarCampoRecordatorio && (
    <div>
      <div className="form-group">
        <label htmlFor="fechaRecordatorio">Fecha del recordatorio:</label>
        <DatePicker
          name="fechaPublicacion"
          value={estado.fechaPublicacion}
          selected={fecha}
          onChange={handleFechaChange}
          className="form-control"
          minDate={new Date(event.extendedProps.creacion)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="numeroRecordatorio">Número del 1 al 9:</label>
        <input
          type="number"
          className="form-control"
          id="numeroRecordatorio"
          name="numeroRecordatorio"
          min="1"
          max="10"
          value={estado.diasRepeticion}
          onChange={e =>
            setEstado({
              ...estado,
              estado: 1,
              diasRepeticion: e.target.value
            })
          }
        />
      </div>
      <Button color="primary" onClick={handleSubmit}>
        Guardar Cambios
      </Button>
    </div>
  )}

      {successMessage && (
        <div style={successMessageStyle}>
          <span style={successIconStyle}>&#10004;</span>
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={errorMessageStyle}>
          <span style={errorIconStyle}>&#10008;</span>
          {errorMessage}
        </div>
      )}
  </>

  );
}

