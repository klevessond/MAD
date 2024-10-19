import React, { useState } from 'react';
import styled from 'styled-components';

const CreatePostContainer = styled.div`
  border-bottom: 1px solid #e6ecf0;
  padding: 20px;
`;

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PostInput = styled.textarea`
  border: none;
  font-size: 18px;
  margin-bottom: 10px;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const PostButton = styled.button`
  background-color: #1da1f2;
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    background-color: #1991db;
  }
`;

function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar postagem para o backend
    // Exemplo:
    // axios.post('http://localhost:8000/api/postagens-usuarios/', { conteudo: content })
    //   .then(response => {
    //     console.log('Postagem criada:', response.data);
    //     setContent('');
    //   })
    //   .catch(error => console.error('Erro ao criar postagem:', error));
  };

  return (
    <CreatePostContainer>
      <PostForm onSubmit={handleSubmit}>
        <PostInput
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <PostButton type="submit">Postar</PostButton>
      </PostForm>
    </CreatePostContainer>
  );
}

export default CreatePost;
