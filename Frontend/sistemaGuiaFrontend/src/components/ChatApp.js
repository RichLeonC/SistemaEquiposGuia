import React, { useEffect, useState } from 'react';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from 'reactstrap';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import axios from "axios";

const ChatApp = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const obtenerConversations = async () => {
    try{
      const response = await axios.get(`http://localhost:4000/chat/${localStorage.getItem("cedula")}`);
      setConversations(response.data);
    } catch(error){
      console.error("error al obtener conversaciones", error);
    }
  };

  const obtenerMensajesDeChat = async (chatId) => {
    try {
      const response = await axios.get(`http://localhost:4000/chat/mensajes/${chatId}`);
      console.log(response.data)
      setMessages(response.data);
    } catch (error) {
      console.error("Error al obtener los mensajes del chat", error);
    }
  };

  const [participantsOptions, setParticipantsOptions] = useState([]);
  
  const obtenerParticipantsOptions = async () => {
    try{
      const response = await axios.get('http://localhost:4000/estudiantes');
      console.log(response.data)
      setParticipantsOptions(response.data);
    } catch(error){
      console.error("error al obtener a los posibles participantes", error);
    }
  };

  

  const [newConversation, setNewConversation] = useState({
    idProfesorCreador: localStorage.getItem("cedula"),
    nombre: '',
    participants: [],
  });

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const selectConversation = (conversationId) => {
    setSelectedConversation(conversationId);
    obtenerMensajesDeChat(conversationId); // Llamada a la función para obtener los mensajes del chat seleccionado
  };
;

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleParticipantSelection = (e) => {
    const selectedParticipantId = e.target.value;
  
    // Buscar el participante correspondiente en participantsOptions
    const selectedParticipant = participantsOptions.find(
      (participant) => participant.cedulaUsuario == selectedParticipantId
    );
  
    if (selectedParticipant) {
      // Verificar si el participante ya está seleccionado
      const isSelected = newConversation.participants.includes(selectedParticipant);
  
      // Copiar el arreglo de participantes actual
      const updatedParticipants = [...newConversation.participants];
  
      if (isSelected) {
        // Deseleccionar el participante
        const index = updatedParticipants.indexOf(selectedParticipant);
        updatedParticipants.splice(index, 1);
      } else {
        // Seleccionar el participante
        updatedParticipants.push(selectedParticipant);
      }
  
      // Actualizar el estado con los participantes actualizados
      setNewConversation({
        ...newConversation,
        participants: updatedParticipants,
      });
    } else {
      console.log('Participante no encontrado');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(newConversation)
      await axios.post('http://localhost:4000/chat', newConversation);
      setConversations([...conversations, newConversation]);
    } catch(error){
      console.error('Error al crear la conversacion', error);
    }
    toggleModal();
  };

  const opcionesParticipante = participantsOptions.map((option) => (
    <option key={option.cedulaUsuario} value={option.cedulaUsuario}>
      {option.cedulaUsuario + "-" + option.nombre + " " + option.apellido1}
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
          <Conversation messages = {messages} idChat={selectedConversation} />
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
                value={newConversation.participants.map(participant => participant.cedulaUsuario)}
                onChange={handleParticipantSelection}
              >
                {opcionesParticipante}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Participantes seleccionados:</Label>
              <ul>
                {newConversation.participants.map(participant => (
                  <li key={participant.cedulaUsuario}>
                    {participant.cedulaUsuario}-{participant.nombre} {participant.apellido1}
                  </li>
                ))}
              </ul>
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