import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalharArtigo() {
  const { id } = useParams();
  const [artigo, setArtigo] = useState(null);

  useEffect(() => {
    const fetchArtigo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/artigos/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setArtigo(response.data);
      } catch (error) {
        console.error('Erro ao buscar artigo:', error);
      }
    };
    fetchArtigo();
  }, [id]);

  if (!artigo) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{artigo.titulo}</h2>
      <p><strong>Conteúdo:</strong> {artigo.conteudo}</p>
      <p><strong>Categoria:</strong> {artigo.categoria.nome}</p>
      <p><strong>Data de Publicação:</strong> {new Date(artigo.data_publicacao).toLocaleString()}</p>
    </div>
  );
}

export default DetalharArtigo;
