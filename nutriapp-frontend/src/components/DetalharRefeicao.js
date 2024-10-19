import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalharRefeicao() {
  const { id } = useParams();
  const [refeicao, setRefeicao] = useState(null);

  useEffect(() => {
    const fetchRefeicao = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/refeicoes/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setRefeicao(response.data);
      } catch (error) {
        console.error('Erro ao buscar refeição:', error);
      }
    };
    fetchRefeicao();
  }, [id]);

  if (!refeicao) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{refeicao.nome}</h2>
      <p><strong>Descrição:</strong> {refeicao.descricao}</p>
      <p><strong>Tipo:</strong> {refeicao.tipo}</p>
      <p><strong>Horário:</strong> {refeicao.horario}</p>
    </div>
  );
}

export default DetalharRefeicao;
