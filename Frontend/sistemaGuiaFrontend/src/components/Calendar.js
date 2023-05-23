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
import AdministrarActividad from "./administrarActividad";
import CommentSection from "./ComentSection";

import axios from 'axios';

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpenSelect, setModalOpenSelect] = useState(false);
  const [modalOpenEvent, setModalOpenEvent] = useState(false);
  const [modalOpenMenu, setModalOpenMenu] = useState(false);


  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [comments, setComments] = useState([]);
  

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
    setSelectedDate(info.startStr);
    toggleModalSelect();
  };

  const handleEventClick = (info) => {
    console.log(info.event.extendedProps)
    setSelectedEvent(info.event);
    toggleModalEvent();
  };


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

    return(
    
    <Modal isOpen={modalOpenEvent} toggle={toggleModalEvent}>
      <ModalHeader toggle={toggleModalEvent}>{event.title}</ModalHeader>
      <ModalBody>
      <p>Fecha de Inicio: { event.start ? event.start.toISOString().split("T")[0] : ""}</p>
      <p>Hora de incio: {event.extendedProps.horaInicio}</p>
      <p>Fecha de Finalización: {event.end ? event.end.toISOString().split("T")[0] : ""}</p>
      <p>Tipo de actividad: {getTipoActividad(event.extendedProps.tipo)}</p>
      <p>Modalidad: {getIsVirtual(event.extendedProps.modalidad)}</p>
      <p>
        {event.extendedProps.modalidad === 1 && (
        <>Enlace: {event.extendedProps.enlace}</> 
      )}
      </p>
      <p>Estado: {getTipoEstado(event.extendedProps.estado)}</p>
      <p>
        {event.extendedProps.estado === 3 && (
        <>Motivo: la actividad fue cancelada porque blah blah</> 
      )}
      </p>
      </ModalBody>
      <ModalFooter>
        <Button color="Terciary" onClick={toggleModalMenu} >Administrar</Button>
        <Button color="Secundary">Recordatorios</Button>
        <Button color="Primary" onClick={toggleModalEvent}>
          Close
        </Button>
      </ModalFooter>
      {modalOpenMenu && <ActivityMenu event={event} />}
    </Modal>
    );
    };


    const ActivityMenu = ({ event }) => {
      // Aquí puedes implementar el contenido y la lógica del menú de administración
      // por ejemplo, puedes utilizar otros componentes de Reactstrap como FormGroup, Input, Label, etc.
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