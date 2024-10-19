import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalharPlanoAlimentar() {
  const { id } = useParams();
  const [plano, setPlano] = useState(null);

  useEffect(() => {
    const fetchPlano = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/planos-alimentares/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setPlano(response.data);
      } catch (error) {
        console.error('Erro ao buscar plano alimentar:', error);
      }
    };
    fetchPlano();
  }, [id]);

  if (!plano) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{plano.titulo}</h2>
      <p><strong>Descrição:</strong> {plano.descricao}</p>
      <p><strong>Público:</strong> {plano.publico ? 'Sim' : 'Não'}</p>
    </div>
  );
}

export default DetalharPlanoAlimentar;
