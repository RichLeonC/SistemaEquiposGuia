import{ useEffect, useState } from 'react';
import { Form, FormGroup, Label, Input, Button  } from 'reactstrap';
import DatePicker from "react-datepicker";
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function AdministrarActividad({event}) {


    const tiposEstados = ['Actividad Realizada', 'Actividad Cancelada', 'Establecer Recordatorio'];

    const [fecha, setFecha] = useState(null);
    const [estado, setEstado] = useState({
        idActividad: event.extendedProps.codigo, //crear la tabla y actualizar estado en la actividad
        estado: '', // 2 -> notificada || 3 -> cancelada || 4 -> realizada
        observacion: '', //justificacion de por qué está cancelada
        fecha: new Date(), //fecha de cancelacion
        fotoEvidencia: '',
        fotoParticipantes: '',
        fechaPublicacion: '',
        diasRepeticion: ''
    });


    const [mostrarMotivoCancelacion, setMostrarMotivoCancelacion] = useState(false);
    const [mostrarCampoImagen, setMostrarCampoImagen] = useState(false);
    const [mostrarCampoRecordatorio, setMostrarCampoRecordatorio] = useState(false);


    const estadoOptions = tiposEstados.map((tipo, index) => (
      <option key={index} value={index}>
        {tipo}
      </option>
    ));

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
      const response = await axios.put('http://localhost:4000/actividades/estadoActividad', estado);
      console.log(response.data);
    } catch(error){
      console.error('Error al actualizar el estado de la actividad', error);
    }
  }


  return (
    <>
    <div>administrarActividad</div>
    <div>Tipo de actividad</div>
    <div class = "form-group">
      <select 
      className="form-control" 
      name="estado"  
      id="estado" 
      onChange={handleChange}>
        <option value="">Seleccione el tipo de actividad</option>
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
          <input
            type="file"
            className="form-control-file"
            id="imagenActividad"
            name="imagenActividad"
            onChange={(e) =>
              setEstado({
                ...estado,
                estado: 2,
                imagenActividad: e.target.files[0],
              })
            }
            
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
      
    </>

  )
}

