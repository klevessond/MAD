import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarArtigo() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/artigos/', {
        titulo,
        conteudo
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/artigos');
    } catch (error) {
      console.error('Erro ao criar artigo:', error);
    }
  };

  return (
    <div>
      <h2>Criar Novo Artigo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
        </div>
        <button type="submit">Criar Artigo</button>
      </form>
    </div>
  );
}

export default CriarArtigo;

