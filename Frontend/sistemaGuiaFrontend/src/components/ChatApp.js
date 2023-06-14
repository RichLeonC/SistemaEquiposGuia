import React, { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import axios from "axios";

const ChatApp = () => {
  const [conversations, setConversations] = useState([
    {
      idChat: 1,
      nombre: 'Conversación 1',
      messages: [
        { id: 1, sender: 'Usuario1', content: 'Hola' },
        { id: 2, sender: 'Usuario2', content: 'Hola, ¿cómo estás?' },
      ],
    },
    {
      idChat: 2,
      nombre: 'Conversación 2',
      messages: [
        { id: 1, sender: 'Usuario3', content: '¡Hola a todos!' },
        { id: 2, sender: 'Usuario1', content: 'Hola Usuario3' },
      ],
    },
    {
      idChat: 3,
      nombre: 'Conversación 3',
      messages: [],
    },
  ]);
  const obtenerConversations = async () => {
    try{
      const response = await axios.get(`http://localhost:4000/chat/${ localStorage.getItem("cedula")}`);
      setConversations(response.data);
    } catch(error){
      console.error("error al obtener conversaciones", error);
    }
  };

  const [participantsOptions, setParticipantsOptions] = useState([]);
  const obtenerParticipantsOptions = async () => {
    try{
      const response = await axios.get('http://localhost:4000/estudiantes');
      setParticipantsOptions(response.data);
    } catch(error){
      console.error("error al obtener a los posibles participantes", error);
    }
  };

  const [newConversation, setNewConversation] = useState({
    idProfesorCreador: localStorage.getItem("cedula"),
    nombre: '',
    participants: [],
  })

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const sendMessage = (messageContent) => {
    const newMessage = {
      id: conversations[selectedConversation - 1].messages.length + 1,
      sender: 'Usuario',
      content: messageContent,
    };

    const updatedConversations = [...conversations];
    updatedConversations[selectedConversation - 1].messages.push(newMessage);

    setConversations(updatedConversations);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleParticipantSelection = (e) => {
    const selectedParticipant = e.target.value;
    const selectedParticipants = newConversation.participants;

    if (selectedParticipants.includes(selectedParticipant)) {
      // Deselect participant if already selected
      setNewConversation({
        ...newConversation,
        participants: selectedParticipants.filter((participant) => participant !== selectedParticipant),
      });
    } else {
      // Select participant if not already selected
      setNewConversation({
        ...newConversation,
        participants: [...selectedParticipants, selectedParticipant],
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(newConversation)
      await axios.post('http://localhost:4000/chat', newConversation);
      setConversations([...conversations, newConversation]);
    } catch(error){
      console.error('Error al crear la conversacion, error')
    }

    toggleModal();
  };

  const opcionesParticipante = participantsOptions.map((option) => (
    <option key={option.cedula} value={option.cedula}>
      {option.nombre + " " + option.apellido1}
    </option>
  ));

  const handleChange = e => {
    const { name, value } = e.target;
    setNewConversation({
      ...newConversation,
      [name]: value
    });
    console.log(newConversation);
  };

  useEffect(() => {
    obtenerConversations();
    obtenerParticipantsOptions();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Button color="primary" onClick={toggleModal}>Crear nueva conversación</Button>
        <ConversationList conversations={conversations} selectConversation={selectConversation} />
        {selectedConversation && (
          <Conversation messages={conversations[selectedConversation - 1].messages} sendMessage={sendMessage} />
        )}
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Crear nuevo chat</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="nombre">Nombre del chat</Label>
            <Input type="text" className="form-control" id="nombre" name="nombre" value={newConversation.nombre} onChange={handleChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="participants">Participantes</Label>
            <Input
              type="select"
              id="participants"
              multiple
              value={newConversation.participants}
              onChange={handleParticipantSelection}
            >
              {opcionesParticipante}
            </Input>
          </FormGroup>
          <Button type="submit" color="primary">Crear</Button>
          </Form>
        </ModalBody>
        <ModalFooter>
          
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  );
};

export default ChatApp;
