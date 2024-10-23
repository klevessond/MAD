import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarReceitas() {
  const [receitas, setReceitas] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchReceitas();
    fetchUsuarioLogado();
  }, []);

  const fetchReceitas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/receitas/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setReceitas(response.data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
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
      <h2>Lista de Receitas</h2>
      <div className="receitas-grid">
        {receitas.map(receita => (
          <div key={receita.id} className="receita-card">
            
            <h3>{receita.titulo}</h3>
            <Link to={`/DetalharReceita/${receita.id}`}>
            {receita.imagens && receita.imagens.length > 0 && (
              <img src={receita.imagens[0].url_imagem_completa} alt={receita.titulo} className="receita-imagem" />
            )}
            Ver detalhes</Link>
            {usuarioLogado && usuarioLogado.id === receita.autor && (
              <Link to={`/EditarReceita/${receita.id}`}> (Editar)</Link>
            )}
          </div>
        ))}
      </div>
      <Link to="/CriarReceita">Criar Nova Receita</Link>
    </div>
  );
}

export default ListarReceitas;
