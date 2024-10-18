import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarArtigo() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtigo();
    fetchCategorias();
  }, [id]);

  const fetchArtigo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/artigos/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      const artigo = response.data;
      setTitulo(artigo.titulo);
      setConteudo(artigo.conteudo);
      setCategoriaId(artigo.categoria.id); // Preencher o estado com o ID da categoria atual
    } catch (error) {
      console.error('Erro ao buscar detalhes do artigo:', error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categorias-artigos/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/artigos/${id}/`, {
        titulo,
        conteudo,
        categoria: categoriaId // Inclua a categoria
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/artigos');
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
          <input 
            type="text" 
            value={titulo} 
            onChange={(e) => setTitulo(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea 
            value={conteudo} 
            onChange={(e) => setConteudo(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>Categoria:</label>
          <select 
            value={categoriaId} 
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
             {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
            {categoriaId && (
              <option value={categoriaId}>Categoria não encontrada</option>
            )}
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarArtigo;
