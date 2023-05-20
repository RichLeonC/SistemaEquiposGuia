import{ useEffect, useState } from 'react';

import axios from "axios";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function administrarActividad() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [profesores, setProfesores] = useState([]); 

 
      
      const obtenerProfesores = async () => {
        try {
          const response = await axios.get('http://localhost:4000/profesores');
          setProfesores(response.data);
        } catch (error){
          console.error("error en obtener profesores", error);
        }
      };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        obtenerProfesores();
      }, []);

  return (
    <div>
    <div>administrarActividad</div>
    <div>Profesore encargado</div>
    <div class = "form-group">
      <select>
        {profesores.map((profesor) => (
          <option key={profesor.codigo} value={profesor.nombre}>
            {profesor.codigo + " " + profesor.nombre}
          </option>
        ))}
      </select>
    </div>
    </div>
  )
}

