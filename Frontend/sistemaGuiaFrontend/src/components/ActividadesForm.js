import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button  } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function ActividadesForm({ selectedDate }) {

  const [selectedFinishDate, setSelectedFinishDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [virtual, setVirtual] = useState(false);
  const [link, setLink] = useState("");
  const [form, setForm] = useState({
    tipoActividad: '',
    nombreActividad:'',
    fechaInicio: new Date(selectedDate),
    horaInicio:'',
    fechaFinal:'',
    modalidad:'',
    enlaceReunion:''

});

const handleVirtualChange = (event) => {
  const isChecked = event.target.checked;
  setVirtual(isChecked);
  
  // Actualizar el valor de modalidad en el estado del formulario
  setForm((prevForm) => ({
    ...prevForm,
    modalidad: isChecked ? 'virtual' : '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Formulario:', form);
  
    // Aquí puedes realizar las acciones necesarias con los datos del formulario
    // Por ejemplo, enviar los datos al servidor o actualizar el estado de la aplicación
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
    handleChange();
  };

  const months = ['January', 'February', 'March', 'April'];
  const tiposActividad = ['Orientacion', 'Motivacion', 'Apoyo', 'Orden'];

  const monthOptions = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));

  const actividadOptions = tiposActividad.map((tipo, index) => (
    <option key={index} value={tipo}>
      {tipo}
    </option>
  ));

  return (
    <Form onSubmit={handleSubmit}>

    <div>Seleccione el tipo de la nueva actividad</div>
    <div class = "form-group">
      <select 
      className="form-control" 
      name="tipoActividad" 
      value={form.tipoActividad} 
      id="tiposActividad" 
      onChange={handleChange}>
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


    <div>SEMANA</div>


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

    <div>Profesores encargados</div>
    <div class = "form-group">
    <select className="form-control" name="" id="month">
          {monthOptions}
        </select>
    </div>
    <div>AFICHE</div>
    <Button type="submit" color="primary">Guardar</Button>
    </Form>
    
  )
}
