import React, { useState } from 'react';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

const ChatApp = () => {
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Conversación 1',
      messages: [
        { id: 1, sender: 'Usuario1', content: 'Hola' },
        { id: 2, sender: 'Usuario2', content: 'Hola, ¿cómo estás?' },
      ],
    },
    {
      id: 2,
      name: 'Conversación 2',
      messages: [
        { id: 1, sender: 'Usuario3', content: '¡Hola a todos!' },
        { id: 2, sender: 'Usuario1', content: 'Hola Usuario3' },
      ],
    },
    {
      id: 3,
      name: 'Conversación 3',
      messages: [],
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [chatName, setChatName] = useState('');
  const [participants, setParticipants] = useState([]);

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

  const createConversation = () => {
    const newConversation = {
      id: conversations.length + 1,
      name: chatName,
      messages: [],
    };

    setConversations([...conversations, newConversation]);
    setChatName('');
    setParticipants([]);
    toggleModal();
  };

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
          <FormGroup>
            <Label for="chatName">Nombre del chat</Label>
            <Input type="text" id="chatName" value={chatName} onChange={(e) => setChatName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="participants">Participantes</Label>
            <Input type="select" id="participants" multiple value={participants} onChange={(e) => setParticipants(Array.from(e.target.selectedOptions, (option) => option.value))}>
              <option value="Usuario1">Usuario1</option>
              <option value="Usuario2">Usuario2</option>
              <option value="Usuario3">Usuario3</option>
            </Input>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={createConversation}>Crear</Button>
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </DashboardLayout>
  );
};

export default ChatApp;
