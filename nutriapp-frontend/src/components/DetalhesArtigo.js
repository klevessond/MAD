import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalhesArtigo() {
  const [artigo, setArtigo] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtigo();
    fetchComentarios();
  }, [id]);

  const fetchArtigo = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/artigos/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setArtigo(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do artigo:', error);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/comentarios-artigos/?artigo=${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/comentarios-artigos/', {
        artigo: id,
        texto: novoComentario
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setNovoComentario('');
      fetchComentarios();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  const handleEditar = () => {
    navigate(`/editar-artigo/${id}`);
  };

  if (!artigo) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{artigo.titulo}</h2>
      <p>{artigo.conteudo}</p>
      <button onClick={handleEditar}>Editar Artigo</button>

      <h3>Comentários</h3>
      <ul>
        {comentarios.map(comentario => (
          <li key={comentario.id}>{comentario.texto}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmitComentario}>
        <textarea 
          value={novoComentario} 
          onChange={(e) => setNovoComentario(e.target.value)}
          placeholder="Adicione um comentário"
          required
        />
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
}

export default DetalhesArtigo;
