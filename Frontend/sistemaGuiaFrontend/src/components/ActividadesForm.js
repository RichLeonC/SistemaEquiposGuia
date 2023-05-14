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

  const handleVirtualChange = (event) => {
    setVirtual(event.target.checked);
  };

  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aquí puedes realizar las acciones necesarias con los datos del formulario
    // Por ejemplo, enviar los datos al servidor o realizar alguna acción en el estado de la aplicación
    console.log("Virtual:", virtual);
    console.log("Link:", link);
  };

  const months = ['January', 'February', 'March', 'April'];
  const tiposActividad = ['Orientacion', 'Motivacion', 'Apoyo', 'Orden'];

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };
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
    <Form>
    <div>Seleccione el tipo de la nueva actividad</div>
    <div class = "form-group">
    <select className="form-control" name="" id="tiposActividad">
          {actividadOptions}
        </select>
    </div>
    <div>Nombre de la actividad</div>
      <div class="input-group mb-3">
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
      </div>
    <div>SEMANA</div>
    <div>FECHA INICIO</div>
    <p>Fecha seleccionada: {selectedDate}</p>
    <>Fecha final</>
    <FormGroup>
  <Label>Selecciona una fecha:</Label>
  <DatePicker
    selected={selectedFinishDate}
    onChange={(date) => setSelectedFinishDate(date)}
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
        value={selectedTime}
        onChange={handleTimeChange}
      />
      <p>Hora seleccionada: {selectedTime}</p>
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
