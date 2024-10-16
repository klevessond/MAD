import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarArtigos() {
  const [artigos, setArtigos] = useState([]);

  useEffect(() => {
    fetchArtigos();
  }, []);

  const fetchArtigos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/artigos/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setArtigos(response.data);
    } catch (error) {
      console.error('Erro ao buscar artigos:', error);
    }
  };

  return (
    <div>
      <h2>Artigos</h2>
      <ul>
        {artigos.map(artigo => (
          <li key={artigo.id}>
            <Link to={`/artigo/${artigo.id}`}>{artigo.titulo}</Link>
          </li>
        ))}
      </ul>
      <Link to="/criar-artigo">Criar Novo Artigo</Link>
    </div>
  );
}

export default ListarArtigos;

