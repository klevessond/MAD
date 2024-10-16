import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarPostagem() {
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/postagens-usuarios/', {
        conteudo,
        imagem
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/postagens');
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Postagem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Conteúdo:</label>
          <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
        </div>
        <div>
          <label>URL da Imagem:</label>
          <input type="text" value={imagem} onChange={(e) => setImagem(e.target.value)} />
        </div>
        <button type="submit">Criar Postagem</button>
      </form>
    </div>
  );
}

export default CriarPostagem;