import React from 'react'

export default function ActividadesForm() {
  return (
    <>
    <div>ActividadesForm</div>
    
    <div>TIPO</div>
    <select class="form-select" aria-label="Default select example">
    <option selected>Seleccione el tipo de actividad</option>
    <option value="1">Orientación</option>
    <option value="2">Motivación</option>
    <option value="3">Apoyo</option>
    <option value="4">Orden tecnico</option>
    <option value="5">Recreación</option>
    </select>
    <div>NOMBRE</div>
    <div>SEMANA</div>
    <div>FECHA INICIO Y FINAL</div>
    <div>HORA INICIO</div>
    <div>MODALIDAD</div> 
    <div>ENLACE REUNION</div>
    <div>ENCARGADOS</div>
    <div>AFICHE</div>
    <div>RECORDATORIO</div>
    <div>ESTADO</div>

    </>
    
  )
}
