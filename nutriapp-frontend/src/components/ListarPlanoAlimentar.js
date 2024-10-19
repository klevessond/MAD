import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarPlanosAlimentares() {
  const [planos, setPlanos] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchPlanos();
    fetchUsuarioLogado();
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
      <h2>Planos Alimentares</h2>
      <ul>
        {planos.map(plano => (
          <li key={plano.id}>
            <Link to={`/DetalharPlanoAlimentar/${plano.id}`}>{plano.titulo}</Link>
            {usuarioLogado && plano.autor === usuarioLogado.id && (
              <Link to={`/EditarPlanoAlimentar/${plano.id}`}> (Editar)</Link>
            )}
          </li>
        ))}
      </ul>
      <Link to="/CriarPlanoAlimentar">Criar Novo Plano Alimentar</Link>
    </div>
  );
}

export default ListarPlanosAlimentares;
