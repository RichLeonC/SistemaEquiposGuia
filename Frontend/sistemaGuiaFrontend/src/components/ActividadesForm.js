import React from 'react'

export default function ActividadesForm() {

  const months = ['January', 'February', 'March', 'April'];

  const monthOptions = months.map((month, index) => (
    <option key={index} value={month}>
      {month}
    </option>
  ));

  return (
    <>
    <div>ActividadesForm</div>
    <div>Tipo de actividad</div>
      <select class="form-select" aria-label="Default select example">
        <option selected>Seleccione el tipo de actividad</option>
        <option value="1">Orientación</option>
        <option value="2">Motivación</option>
        <option value="3">Apoyo</option>
        <option value="4">Orden tecnico</option>
        <option value="5">Recreación</option>
      </select>
    <div>Nombre de la actividad</div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
        <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
      </div>
    <div>SEMANA</div>
    <div>FECHA INICIO Y FINAL</div>
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
