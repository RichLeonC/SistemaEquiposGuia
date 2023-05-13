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
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  /*const handleSelect = (info) => {
    const { start, end } = info;
    const eventNamePrompt = prompt('Enter event name:');
    if (eventNamePrompt) {
      const newEvent = {
        start,
        end,
        title: eventNamePrompt,
        id: uuid(),
      };
      setEvents([...events, newEvent]);
    }
  };*/

  const EventPopover = ({ event }) => (
    <Popover id={event.id}>
      <Popover.Title>{event.title}</Popover.Title>
      <Popover.Content>
        <p>Start: {event.start}</p>
        <p>End: {event.end}</p>
      </Popover.Content>
    </Popover>
  );

  const handleEventClick = (info) => {
    const { event } = info;
    const popover = <EventPopover event={event} />;
    ReactDOM.render(popover, document.getElementById('popover-container'));
  };

  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };
  
  return (
    <DashboardLayout>
    <div id='full-calendar'>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        views={["dayGridMonth", "dayGridWeek", "dayGridDay"]}
        editable
        selectable
        events={events}
        select={toggleModal}
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
      <DashboardLayout>
      <Modal isOpen={modalOpen} xl>
        <ModalHeader className={{justifyContent: 'center'}}>
          <div style= {{justifyContent: 'center'}}>Nueva actividad</div>
        </ModalHeader>
        <ModalBody>
            <ActividadesForm/>
        </ModalBody>

        <ModalFooter>
            <Button color="primary">Crear</Button>
            <Button color="secondary" onClick={toggleModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
      </DashboardLayout>
    </div>
    </DashboardLayout>
    );
  }
  
  export default Calendar;