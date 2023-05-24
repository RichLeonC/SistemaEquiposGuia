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


const obtenerProfesores = async () => {
  try {
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

const handleChangeProf = e => {
  const { name, value } = e.target;
  setProfesorEncargado({
      ...profesorEncargado,
      [name]: value
  })
  console.log(profesorEncargado);
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
  console.log('Formulario:', form);
  console.log('Profesor: ', profesorEncargado)
  console.log('Afiche', form.afiche)
//proceso de insercion a la base de datos 
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

    console.log('Formulario:', formData);

    await axios.post('http://localhost:4000/actividades', formData);
    //console.log('Actividad creada exitosamente.');
    // Realiza cualquier acción adicional después de almacenar los datos en la base de datos
  } catch (error) {
    console.error('Error al crear la Actividad:', error);
    // Maneja el error de acuerdo a tus necesidades
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

    <div>Tipo de actividad</div>
    <div class = "form-group">
      <select 
      className="form-control" 
      name="tipoActividad" 
      value={form.tipoActividad} 
      id="tiposActividad" 
      onChange={handleChange}>
        <option value="">Seleccione el tipo de actividad</option>
        {actividadOptions}
      </select>
    </div>


    <div>Nombre de la actividad</div>
    <div class="input-group mb-3">
      <input type="text" 
      class="form-control" a
      ria-label="Sizing example input" 
      aria-describedby="inputGroup-sizing-default" 
      name = "nombreActividad" 
      value={form.nombreActividad} 
      onChange={handleChange}/>
    </div>

    <div>FECHA INICIO</div>
    <p>Fecha seleccionada: {selectedDate}</p>


    <>FECHA FINAL</>
    <FormGroup>
    <Label>Selecciona una fecha:</Label>
    <DatePicker
      name="fechaFinal"
      value= {form.fechaFinal}
      selected={selectedFinishDate}
      onChange={handleFechaFinalChange}
      minDate={new Date(selectedDate)} // Aquí estableces la fecha mínima
      className="form-control"
    />
    </FormGroup>

    <div>HORA INICIO</div>
    <div>
      <label htmlFor="timePicker">Selecciona una hora:</label>
      <input
        type="time"
        id="timePicker"
        name="horaInicio"
        value={form.horaInicio}
        onChange={handleChange}
      />
      <p>Hora seleccionada: {form.horaInicio}</p>
    </div>



    <div>MODALIDAD</div> 
    <FormGroup check>
        <Label check>
          <Input
            type="checkbox"
            checked={virtual}
            onChange={handleVirtualChange}
          />{" "}
          Virtual
        </Label>
      </FormGroup>
      {virtual && (
        <FormGroup>
          <Label for="link">Enlace:</Label>
          <Input
            type="text"
            id="link"
            value={link}
            onChange={handleLinkChange}
          />
        </FormGroup>
      )}

  <div>Profesor encargado</div>
    <div class = "form-group">
      <select
      className="form-control"
      name = "idProfesor"
      value = {form.idProfesor}
      id ="idProfesor"
      onChange={handleChange}>
        <option value="">Seleccione al profesor encargado</option>
        {profesoresOptions}
      </select>
    </div>

    <div>AFICHE</div>
    <Input 
    type="file"
    id="idAfiche"
    name="afiche"
    onChange={handleChangeArchivo}
    />
    <Button type="submit" color="primary">Guardar</Button>
    </Form>
    
  )
}
