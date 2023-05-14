import React, { useState } from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';
export default function ActividadesForm({ selectedDate }) {

  const [selectedFinishDate, setSelectedFinishDate] = useState(null);

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
    <>
    <div>ActividadesForm</div>
    <div>Tipo de actividad</div>
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

    <div>MODALIDAD</div> 
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
        <label class="form-check-label" for="flexRadioDefault1">
        Virtual
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked/>
        <label class="form-check-label" for="flexRadioDefault2">
        Presencial
        </label>
      </div>
    <div>ENLACE REUNION</div>

    <div>Profesores encargados</div>
    <div class = "form-group">
    <select className="form-control" name="" id="month">
          {monthOptions}
        </select>
    </div>
    <div>AFICHE</div>
    <div>RECORDATORIO</div>
    <div>ESTADO</div>

    </>
    
  )
}
