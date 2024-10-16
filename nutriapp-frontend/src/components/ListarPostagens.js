import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarPostagens() {
  const [postagens, setPostagens] = useState([]);

  useEffect(() => {
    fetchPostagens();
  }, []);

  const fetchPostagens = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/postagens-usuarios/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
    }
  };

  return (
    <div>
      <h2>Postagens</h2>
      <ul>
        {postagens.map(postagem => (
          <li key={postagem.id}>
            <Link to={`/postagem/${postagem.id}`}>{postagem.conteudo.substring(0, 50)}...</Link>
          </li>
        ))}
      </ul>
      <Link to="/criar-postagem">Criar Nova Postagem</Link>
    </div>
  );
}

export default ListarPostagens;