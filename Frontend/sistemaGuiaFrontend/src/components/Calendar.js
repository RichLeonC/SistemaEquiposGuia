import React, {useState, useEffect} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import ActividadesForm from './ActividadesForm'
import AdministrarActividad from "./AdministrarActividad";
import CommentSection from "./ComentSection";

import axios from 'axios';

export const Calendar = () => {
  const [events, setEvents] = useState([]);

  const [modalOpenSelect, setModalOpenSelect] = useState(false);
  const [modalOpenEvent, setModalOpenEvent] = useState(false);
  const [modalOpenMenu, setModalOpenMenu] = useState(false);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const[profesorActual, setProfesorActual] = useState([]);

  const [showRecordatorio, setShowRecordatorio] = useState(false);
  const [recordatorio, setRecordatorio] = useState('');

  
  const [showCancelado, setShowCancelado] = useState(false);
  const [cancelacion, setCancelacion] = useState('');

  const [showEvidencia, setShowEvidencia] = useState(false);
  const [evidencia, setEvidencia] = useState('');
  
  const apiURIProfesores = "http://localhost:4000/profesores";

  const toggleModalSelect = () => {
    setModalOpenSelect(!modalOpenSelect);
  };

  const toggleModalEvent = () => {
    setModalOpenEvent(!modalOpenEvent);
  };

  const toggleModalMenu = () => {
    setModalOpenMenu(!modalOpenMenu); 
  };

  const handleDateSelect = (info) => {
    if(profesorActual.esCordinador === 1){
      setSelectedDate(info.startStr);
      toggleModalSelect();
    } else {
      console.log("Solo cordinador puede crear cosas")
    }
  
  };

  const handleEventClick = async (info) => {
    console.log('fecha crewcion', info.event.extendedProps.creacion)
    setSelectedEvent(info.event);
    setShowRecordatorio(info.event.extendedProps.estado === 1);
    setShowEvidencia(info.event.extendedProps.estado === 2);
    setShowCancelado(info.event.extendedProps.estado === 3);
    if (info.event.extendedProps.estado === 1) {
      try {
        const response = await axios.get(`http://localhost:4000/actividades/${info.event.extendedProps.codigo}/recordatorio`);
        setRecordatorio(response.data);
        console.log('recordatorio',response.data);
      } catch (error) {
        console.error('Error al obtener el recordatorio:', error);
      }
    } else if (info.event.extendedProps.estado === 2){
      try {
        const response = await axios.get(`http://localhost:4000/actividades/${info.event.extendedProps.codigo}/evidencia`);
        setEvidencia(response.data);
        console.log('Evidencia',response.data);
      } catch (error) {
        console.error('Error al obtener Evidencia:', error);
      }
    } else if (info.event.extendedProps.estado === 3){
      try {
        const response = await axios.get(`http://localhost:4000/actividades/${info.event.extendedProps.codigo}/cancelada`);
        setCancelacion(response.data);
        console.log('Cancelacion',response.data);
      } catch (error) {
        console.error('Error al obtener el Cancelamiento:', error);
      }
    }
    toggleModalEvent();
  };


  const peticionGetProfesorActual = async () => {
    try {
        const response = await axios.get(apiURIProfesores + "/" + localStorage.getItem("cedula"));
        setProfesorActual(response.data);
    } catch (error) {
        console.log(error);
    }
}

  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>

      </div>
    );
  };

  const getTipoActividad = (tipo) => {
    switch(tipo){
      case 0:
        return "Orientadoras";
      case 1:
        return "Motivacionales";
      case 2:
        return "De Apoyo";
      case 3:
        return "Orden Tecnico";
      case 4:
        return "Recreacion";
      default:
        return "Tipo desconocido";
    }
  };

  const getTipoEstado = (tipo) => {
    switch(tipo){
      case 0:
        return "Planeada";
      case 1:
        return "Notificada";
      case 2:
        return "Realizada";
      case 3:
        return "Cancelada";
      default:
        return "Estado desconocido";
    }
  };

  const getIsVirtual = (tipo) => {
    switch(tipo){
      case 0:
        return "Presencial";
      case 1:
        return "Virtual";
      default:
        return "Modalidad desconocido";
    }
  };
  

  

  const EventModal = ({ event }) => {
    return (
      <Modal isOpen={modalOpenEvent} toggle={toggleModalEvent}>
        <ModalHeader toggle={toggleModalEvent}>{event.title}</ModalHeader>
        <ModalBody>
          <div style={{ marginBottom: '10px' }}>
            <strong>Fecha de Inicio:</strong> {event.start ? event.start.toISOString().split("T")[0] : ""}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Hora de inicio:</strong> {event.extendedProps.horaInicio}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Fecha de Finalización:</strong> {event.end ? event.end.toISOString().split("T")[0] : ""}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Tipo de actividad:</strong> {getTipoActividad(event.extendedProps.tipo)}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Modalidad:</strong> {getIsVirtual(event.extendedProps.modalidad)}
          </div>
          {event.extendedProps.modalidad === 1 && (
            <div style={{ marginBottom: '10px' }}>
              <strong>Enlace:</strong> {event.extendedProps.enlace}
            </div>
          )}
        {event.extendedProps.afiche && (
          <div style={{ marginBottom: '10px' }}>
            <strong>Afiche:</strong>
            <br />
            <img src={event.extendedProps.afiche} alt="Afiche" style={{ maxWidth: '100%' }} />
          </div>
        )}
          <div style={{ marginBottom: '10px' }}>
            <strong>Estado:</strong> {getTipoEstado(event.extendedProps.estado)}
          </div>
          {showRecordatorio && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Se recordará a partir de:</strong> {recordatorio.fecha}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Se recordará cada:</strong> {recordatorio.dias} días
              </div>
            </>
          )}
          {showCancelado && (
            <>
              <div style={{ marginBottom: '10px' }}>
                <strong>Motivo:</strong> {cancelacion.observacion}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Fecha en que se canceló:</strong> {cancelacion.fecha}
              </div>
            </>
          )}
          {showEvidencia&& (
            <>
          <div style={{ marginBottom: '10px' }}>
            <strong>Evidencia:</strong>
            <br />
            <img src={evidencia.idImagen} alt="Evidencia" style={{ maxWidth: '100%' }} />
          </div>

            </>
          )}
        </ModalBody>
        <CommentSection idActividad={event.extendedProps.codigo} />
        <ModalFooter>
          <Button color="Terciary" onClick={toggleModalMenu}>Administrar</Button>
          <Button color="Primary" onClick={toggleModalEvent}>Close</Button>
        </ModalFooter>
        {modalOpenMenu && <ActivityMenu event={event} />}
      </Modal>
    );
  };
  

    const ActivityMenu = ({ event }) => {
      return (
        <Modal isOpen={modalOpenMenu}>
          <ModalHeader toggle={toggleModalMenu}>{event.title}</ModalHeader>
          <ModalBody>
            <AdministrarActividad event = {event}/>
          </ModalBody>
          <ModalFooter>
        <Button color="Primary" onClick={toggleModalMenu}>
          Close
        </Button>
      </ModalFooter>
        </Modal>
      );
    };

    useEffect(() => {
      const obtenerActividades = async () => {
        try {
          const response = await axios.get('http://localhost:4000/actividades'); // Ruta de la API para obtener las actividades
          const actividades = response.data;
          setEvents(response.data);
          console.log(actividades);
        } catch (error) {
          console.error('Error al obtener las actividades:', error);
        }
      };
    
      obtenerActividades();
      peticionGetProfesorActual();
    }, []);
  
  return (
    <DashboardLayout>
      <DashboardNavbar />
    <div id='full-calendar'>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        editable
        selectable
        events={events}
        timeZone="UTC"
        navLinks // Agrega esta opción
        select={handleDateSelect}
        eventClick ={handleEventClick}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev, next",
          center: "title",
          end: "dayGridMonth, dayGridWeek, dayGridDay",
        }}
        
        eventContent={(info) => <EventItem info={info} />}
        height={"90vh"}
      /> 
      {selectedEvent && <EventModal event={selectedEvent} />}
      <DashboardLayout>
      <Modal isOpen={modalOpenSelect} id="ActividadForm">
        <ModalHeader className={{justifyContent: 'center'}}>
          <div style= {{justifyContent: 'center'}}>Nueva actividad</div>
        </ModalHeader>
        <ModalBody>
            <ActividadesForm selectedDate={selectedDate}/>
        </ModalBody>

        <ModalFooter>
            <Button color="secondary" onClick={toggleModalSelect}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </DashboardLayout>
    </div>
    </DashboardLayout>
    );
  }
  
  export default Calendar;