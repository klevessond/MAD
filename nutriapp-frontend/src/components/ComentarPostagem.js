import React, { useState } from 'react';
import axios from 'axios';

function ComentarPostagem({ postagemId, onNovoComentario }) {
  const [texto, setTexto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/comentarios-postagens/', {
        postagem: postagemId,
        texto
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setTexto('');
      onNovoComentario();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  return (
    <div>
      <h4>Adicionar Comentário</h4>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={texto} 
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite seu comentário"
          required
        />
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
}

export default ComentarPostagem;

