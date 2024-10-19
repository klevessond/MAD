import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarRefeicoes() {
  const [refeicoes, setRefeicoes] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchRefeicoes();
    fetchUsuarioLogado();
  }, []);

  const fetchRefeicoes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/refeicoes/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRefeicoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar refeições:', error);
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

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta refeição?')) {
      try {
        await axios.delete(`http://localhost:8000/api/refeicoes/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        fetchRefeicoes();
      } catch (error) {
        console.error('Erro ao excluir refeição:', error);
      }
    }
  };

  return (
    <div>
      <h2>Lista de Refeições</h2>
      <ul>
        {refeicoes.map(refeicao => (
          <li key={refeicao.id}>
            <Link to={`/DetalharRefeicao/${refeicao.id}`}>{refeicao.nome} - {refeicao.tipo}</Link>
            {usuarioLogado && (
              <>
                <Link to={`/EditarRefeicao/${refeicao.id}`}> (Editar)</Link>
                <button onClick={() => handleDelete(refeicao.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Link to="/CriarRefeicao">Criar Nova Refeição</Link>
    </div>
  );
}

export default ListarRefeicoes;
