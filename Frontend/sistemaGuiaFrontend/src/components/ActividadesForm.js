import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, Label, Input, Button  } from 'reactstrap';
import DatePicker from 'react-datepicker';
import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';


export default function ActividadesForm({ selectedDate }) {

  const [selectedFinishDate, setSelectedFinishDate] = useState(null);
  const [afiche, setAfiche] = useState(null);
  const [virtual, setVirtual] = useState(false);
  const [link, setLink] = useState("");
  const [profesores, setProfesores] = useState([]); 

  const [profesorEncargado, setProfesorEncargado] = useState({
      generacion: new Date().getFullYear(), //se tiene que hacer otro proceso para obtener la generacion del profesor seleccionado
      idProfesor: '' //codigo de profesor seleccionado      
    });
  const [form, setForm] = useState({
   // codigoActividad: '',
    tipoActividad: '',
    nombreActividad:'',
    fechaInicio: new Date(selectedDate),
    horaInicio:'',
    fechaCreacion: new Date(),
    modalidad: '',
    enlaceReunion: '',
    estadoActividad: 0, //se crea como planeada
    fechaFinal: '',
    generacion: new Date().getFullYear(),
    idProfesor: '',
    afiche: afiche

});

const [formError, setFormError] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
const [submitSuccess, setSubmitSuccess] = useState(false);

const obtenerProfesores = async () => {
  try {
    //const response = await axios.get(`http://localhost:4000/equipos/profesEquipoGuia/${form.generacion}`);
    const response = await axios.get('http://localhost:4000/profesores');
    setProfesores(response.data);
  } catch (error){
    console.error("error en obtener profesores", error);
  }
};

const handleVirtualChange = (event) => {
  const isChecked = event.target.checked;
  setVirtual(isChecked);
  
  // Actualizar el valor de modalidad en el estado del formulario
  setForm((prevForm) => ({
    //en caso de estar marcado se clasifica como true 1
    //caso contrario es 0 false
    ...prevForm,
    modalidad: isChecked ? 1 : 0,
  }));
};

const validateForm = () => {
  if (
    form.tipoActividad === '' ||
    form.nombreActividad === '' ||
    form.fechaFinal === '' ||
    form.horaInicio === '' ||
    form.idProfesor === '' ||
    form.afiche === null
  ) {
    setFormError(true);
  } else {
    setFormError(false);
  }
};

const handleLinkChange = (event) => {
  const linkValue = event.target.value;
  setLink(linkValue);
  
  // Actualizar el valor de enlaceReunion en el estado del formulario
  setForm((prevForm) => ({
    ...prevForm,
    enlaceReunion: linkValue,
  }));
};

  const handleFechaFinalChange = (date) => {
    setSelectedFinishDate(date);
    setForm((prevForm) => ({
      ...prevForm,
      fechaFinal: date,
    }));
  };
  

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({
        ...form,
        [name]: value
    })
    console.log(form);
}


const handleChangeArchivo = (event) => {
  const aficheFile = event.target.files[0];

  if (aficheFile) {
    setForm((prevForm) => ({
      ...prevForm,
      afiche: event.target.files[0],
    }));
  } else {
    setForm((prevForm) => ({
      ...prevForm,
      afiche: null,
    }));
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();
  validateForm();

  if (!formError) {
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('tipoActividad', form.tipoActividad);
      formData.append('nombreActividad', form.nombreActividad);
      formData.append('fechaInicio', form.fechaInicio);
      formData.append('horaInicio', form.horaInicio);
      formData.append('fechaCreacion', form.fechaCreacion);
      formData.append('modalidad', form.modalidad);
      formData.append('enlaceReunion', form.enlaceReunion);
      formData.append('estadoActividad', form.estadoActividad);
      formData.append('fechaFinal', form.fechaFinal);
      formData.append('generacion', form.generacion);
      formData.append('idProfesor', form.idProfesor);
      formData.append('afiche', form.afiche);

      await axios.post('http://localhost:4000/actividades', formData);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Error al crear la Actividad:', error);
      setSubmitSuccess(false);
    }

    setIsSubmitting(false);
  }
};

  const tiposActividad = ['Orientacion', 'Motivacion', 'Apoyo', 'Orden', 'Recreacion'];
  

  const actividadOptions = tiposActividad.map((tipo, index) => (
    <option key={index} value={index}>
      {tipo}
    </option>
  ));

  const profesoresOptions =  profesores.map((profesor) => (
    <option key={profesor.codigo} value={profesor.codigo}>
      {profesor.codigo + " " + profesor.nombre}
    </option>
  ));

      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        obtenerProfesores();
      }, []);

  return (
<Form onSubmit={handleSubmit}>
  {isSubmitting && (
    <div className="alert alert-info" role="alert">
      Enviando formulario...
    </div>
  )}

  {submitSuccess && (
    <div className="alert alert-success" role="alert">
      ¡El formulario se envió exitosamente!
    </div>
  )}

  {formError && !isSubmitting && (
    <div className="alert alert-danger" role="alert">
      Error al enviar el formulario. Por favor, completa todos los campos requeridos.
    </div>
  )}

  <div className={`form-group ${formError && form.tipoActividad === '' ? 'is-invalid' : ''}`}>
    <label htmlFor="tiposActividad">Tipo de actividad</label>
    <select 
      className="form-control" 
      name="tipoActividad" 
      value={form.tipoActividad} 
      id="tiposActividad" 
      onChange={handleChange}
    >
      <option value="">Seleccione el tipo de actividad</option>
      {actividadOptions}
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="nombreActividad">Nombre de la actividad</label>
    <input
      type="text" 
      className="form-control"
      id="nombreActividad" 
      name="nombreActividad" 
      value={form.nombreActividad} 
      onChange={handleChange}
    />
  </div>

  <div>FECHA INICIO</div>
  <p>Fecha seleccionada: {selectedDate}</p>

  <div className="form-group">
    <label>FECHA FINAL</label>
    <DatePicker
      name="fechaFinal"
      value={form.fechaFinal}
      selected={selectedFinishDate}
      onChange={handleFechaFinalChange}
      minDate={new Date(selectedDate)}
      className="form-control"
    />
  </div>

  <div className="form-group">
    <label htmlFor="timePicker">HORA INICIO</label>
    <input
      type="time"
      id="timePicker"
      name="horaInicio"
      value={form.horaInicio}
      onChange={handleChange}
      className="form-control"
    />
    <p>Hora seleccionada: {form.horaInicio}</p>
  </div>

  <div className="form-group">
    <label className="mr-2">MODALIDAD</label>
    <FormGroup check inline>
      <Label check>
        <Input
          type="checkbox"
          checked={virtual}
          onChange={handleVirtualChange}
        />{" "}
        Virtual
      </Label>
    </FormGroup>
  </div>

  {virtual && (
    <div className="form-group">
      <label htmlFor="link">Enlace:</label>
      <input
        type="text"
        id="link"
        value={link}
        onChange={handleLinkChange}
        className="form-control"
      />
    </div>
  )}

  <div className="form-group">
    <label htmlFor="idProfesor">Profesor encargado</label>
    <select
      className="form-control"
      name="idProfesor"
      value={form.idProfesor}
      id="idProfesor"
      onChange={handleChange}
    >
      <option value="">Seleccione al profesor encargado</option>
      {profesoresOptions}
    </select>
  </div>

  <div className="form-group">
    <label htmlFor="idAfiche">AFICHE</label>
    <Input 
      type="file"
      id="idAfiche"
      name="afiche"
      onChange={handleChangeArchivo}
    />
  </div>

  <Button type="submit" color="primary">Guardar</Button>
</Form>
    
  )
}
