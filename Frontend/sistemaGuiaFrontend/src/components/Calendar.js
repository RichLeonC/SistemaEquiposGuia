import React, {useState, useEffect} from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ActividadesForm from './ActividadesForm'
import CommentSection from "./ComentSection";

import axios from 'axios';

export const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Evento 1",
      start: "2023-05-01",
      end: "2023-05-02",
    },
    {
      title: "Evento 2",
      start: "2023-05-05",
      end: "2023-05-07",
    },
    {
      title: "Evento 3",
      start: "2023-05-10",
      end: "2023-05-12",
    },
  ]);
  const [modalOpenSelect, setModalOpenSelect] = useState(false);
  const [modalOpenEvent, setModalOpenEvent] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [comments, setComments] = useState([]);
  

  const toggleModalSelect = () => {
    setModalOpenSelect(!modalOpenSelect);
  };

  const toggleModalEvent = () => {
    setModalOpenEvent(!modalOpenEvent);
  };

  const handleDateSelect = (info) => {
    setSelectedDate(info.startStr);
    toggleModalSelect();
  };

  const handleEventClick = (info) => {
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
  

  const EventModal = ({ event }) => (
    
    <Modal isOpen={modalOpenEvent} toggle={toggleModalEvent}>
      <ModalHeader toggle={toggleModalEvent}>{event.title}</ModalHeader>
      <ModalBody>
      <p>Start: { event.start ? event.start.toISOString().split("T")[0] : ""}</p>
      <p>End: {event.end ? event.end.toISOString().split("T")[0] : ""}</p>
      </ModalBody>
      <ModalFooter>
        <Button color="Secundary">Editar</Button>
        <Button color="Terciary" >Comentar</Button>
        <Button color="Quarter">Adminstrar</Button>
        <Button color="primary" onClick={toggleModalEvent}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );

  useEffect(() => {
    const obtenerActividades = async () => {
      try {
        const response = await axios.get('http://localhost:4000/actividades'); // Ruta de la API para obtener las actividades

        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error al obtener las actividades:', error);
      }
    };

    obtenerActividades();
  }, []);
  
  return (
    <DashboardLayout>
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