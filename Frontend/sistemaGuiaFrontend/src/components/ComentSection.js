import React, { useState } from 'react';
import { Card, CardBody, Form, FormGroup, Input, Button } from 'reactstrap';

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const Comment = ({ comment }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReplySubmit = (event) => {
    event.preventDefault();
    // Aquí puedes guardar la respuesta en la base de datos y actualizar el estado de respuestas del comentario
    setReplyContent('');
  };

  return (
    <div>
      <Card>
        <CardBody>
          <p>{comment.content}</p>
          <p>Fecha: {comment.date}</p>
          <div>
            {comment.replies.map((reply) => (
              <div key={reply.id}>
                <p>{reply.content}</p>
                <p>Fecha: {reply.date}</p>
              </div>
            ))}
          </div>
          <Form onSubmit={handleReplySubmit}>
            <FormGroup>
              <Input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Responder al comentario..."
              />
            </FormGroup>
            <Button type="submit" color="primary">Responder</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

const CommentSection = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes guardar el comentario en la base de datos y actualizar el estado de comentarios
  };

  return (
    <DashboardLayout>
    <div>
      <h2>Comentarios</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <Form onSubmit={handleCommentSubmit}>
        <FormGroup>
          <Input type="text" placeholder="Escribe un comentario..." />
        </FormGroup>
        <Button type="submit" color="primary">Publicar comentario</Button>
      </Form>
    </div>
    </DashboardLayout>
  );
};

export default CommentSection;
