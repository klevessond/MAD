import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarArtigos() {
  const [artigos, setArtigos] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchArtigos();
    fetchUsuarioLogado();
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

  const fetchUsuarioLogado = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setUsuarioLogado(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
    }
  };

  return (
    <div>
      <h2>Artigos</h2>
      <ul>
        {artigos.map(artigo => (
          <li key={artigo.id}>
            <Link to={`/DetalharArtigo/${artigo.id}`}>{artigo.titulo}</Link>
            {usuarioLogado && usuarioLogado.id === artigo.autor && (
              <Link to={`/EditarArtigo/${artigo.id}`}> (Editar)</Link>
            )}
          </li>
        ))}
      </ul>
      <Link to="/CriarArtigo">Criar Novo Artigo</Link>
    </div>
  );
}

export default ListarArtigos;
