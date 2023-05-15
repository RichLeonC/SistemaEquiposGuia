import React, {useState, useEffect} from "react";
import * as ReactDOM from 'react-dom';
import { v4 as uuid } from "uuid";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Popover from 'react-bootstrap/Popover';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import ActividadesForm from './ActividadesForm'
import CommentSection from "./ComentSection";

export const Calendar = () => {
  const [events, setEvents] = useState([
    {
      id: uuid(),
      title: "Evento 1",
      start: "2023-05-01",
      end: "2023-05-02",
      description: "Descripción del evento 1",
      location: "Ubicación del evento 1",
    },
    {
      id: uuid(),
      title: "Evento 2",
      start: "2023-05-05",
      end: "2023-05-07",
      description: "Descripción del evento 2",
      location: "Ubicación del evento 2",
    },
    {
      id: uuid(),
      title: "Evento 3",
      start: "2023-05-10",
      end: "2023-05-12",
      description: "Descripción del evento 3",
      location: "Ubicación del evento 3",
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
      <p>Start: {event.startStr}</p>
      <p>End: {event.endStr}</p>
      <p>Description: {event.extendedProps.description}</p>
      <p>Location: {event.extendedProps.location}</p>
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
  
  return (
    <DashboardLayout>
    <div id='full-calendar'>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        editable
        selectable
        events={events}
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