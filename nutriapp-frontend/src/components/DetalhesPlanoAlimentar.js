
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

function DetalhesPlanoAlimentar() {
  const [plano, setPlano] = useState(null);
  const [refeicoes, setRefeicoes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlano();
    fetchRefeicoes();
  }, [id]);

  const fetchPlano = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/planos-alimentares/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPlano(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do plano alimentar:', error);
    }
  };

  const fetchRefeicoes = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/refeicoes/?plano=${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRefeicoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar refeições:', error);
    }
  };

  const handleEditar = () => {
    navigate(`/editar-plano-alimentar/${id}`);
  };

  if (!plano) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{plano.titulo}</h2>
      <p>{plano.descricao}</p>
      <p>Público: {plano.publico ? 'Sim' : 'Não'}</p>
      <button onClick={handleEditar}>Editar Plano Alimentar</button>

      <h3>Refeições</h3>
      <ul>
        {refeicoes.map(refeicao => (
          <li key={refeicao.id}>
            <Link to={`/refeicao/${refeicao.id}`}>{refeicao.nome}</Link>
          </li>
        ))}
      </ul>
      <Link to={`/criar-refeicao/${id}`}>Adicionar Refeição</Link>
    </div>
  );
}

export default DetalhesPlanoAlimentar;