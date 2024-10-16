import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ComentarPostagem from './ComentarPostagem';

function DetalhesPostagem() {
  const [postagem, setPostagem] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostagem();
    fetchComentarios();
  }, [id]);

  const fetchPostagem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPostagem(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da postagem:', error);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/comentarios-postagens/?postagem=${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleEditar = () => {
    navigate(`/editar-postagem/${id}`);
  };

  const handleNovoComentario = () => {
    fetchComentarios();
  };

  if (!postagem) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>Detalhes da Postagem</h2>
      <p>{postagem.conteudo}</p>
      {postagem.imagem && <img src={postagem.imagem} alt="Imagem da postagem" />}
      <p>Data de publicação: {new Date(postagem.data_publicacao).toLocaleString()}</p>
      <button onClick={handleEditar}>Editar Postagem</button>

      <h3>Comentários</h3>
      <ul>
        {comentarios.map(comentario => (
          <li key={comentario.id}>
            <p>{comentario.texto}</p>
            <small>Por: {comentario.usuario} em {new Date(comentario.data_publicacao).toLocaleString()}</small>
          </li>
        ))}
      </ul>

      <ComentarPostagem postagemId={id} onNovoComentario={handleNovoComentario} />
    </div>
  );
}

export default DetalhesPostagem;

