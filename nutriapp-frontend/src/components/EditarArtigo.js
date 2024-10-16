import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarArtigo() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtigo();
  }, [id]);

  const fetchArtigo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/artigos/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setTitulo(response.data.titulo);
      setConteudo(response.data.conteudo);
    } catch (error) {
      console.error('Erro ao buscar detalhes do artigo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/artigos/${id}/`, {
        titulo,
        conteudo
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/artigo/${id}`);
    } catch (error) {
      console.error('Erro ao editar artigo:', error);
    }
  };

  return (
    <div>
      <h2>Editar Artigo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarArtigo;

