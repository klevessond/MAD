import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalharReceita() {
  const { id } = useParams();
  const [receita, setReceita] = useState(null);

  useEffect(() => {
    const fetchReceita = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/receitas/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setReceita(response.data);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchReceita();
  }, [id]);

  if (!receita) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{receita.titulo}</h2>
      <p><strong>Descrição:</strong> {receita.descricao}</p>
      <p><strong>Modo de Preparo:</strong> {receita.modo_preparo}</p>
      <p><strong>Tempo de Preparo:</strong> {receita.tempo_preparo} minutos</p>
      <p><strong>Dificuldade:</strong> {receita.dificuldade}</p>
      <p><strong>Categoria:</strong> {receita.categoria.nome}</p>
    </div>
  );
}

export default DetalharReceita;
