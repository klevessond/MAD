import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarPlanosAlimentares() {
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    fetchPlanos();
  }, []);

  const fetchPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/planos-alimentares/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPlanos(response.data);
    } catch (error) {
      console.error('Erro ao buscar planos alimentares:', error);
    }
  };

  return (
    <div>
      <h2>Planos Alimentares</h2>
      <ul>
        {planos.map(plano => (
          <li key={plano.id}>
            <Link to={`/plano-alimentar/${plano.id}`}>{plano.titulo}</Link>
          </li>
        ))}
      </ul>
      <Link to="/criar-plano-alimentar">Criar Novo Plano Alimentar</Link>
    </div>
  );
}

export default ListarPlanosAlimentares;

