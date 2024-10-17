import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserData();
      fetchReceitas();
    }
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    navigate('/login');
  };

  return (
    <div>
      <h1>Bem-vindo ao NutriApp</h1>
      {user && (
        <div>
          <p>Olá, {user.username}!</p>
          <button onClick={handleLogout}>Sair</button>
        </div>
      )}
      <h2>Receitas Recentes</h2>
      <ul>
        {receitas.map(receita => (
          <li key={receita.id}>
            <Link to={`/receita/${receita.id}`}>{receita.titulo}</Link>
          </li>
        ))}
      </ul>
      {user && user.user_type === 'nutricionista' && (
        <div>
          <h3>Opções para Nutricionistas:</h3>
          <ul>
            <li><Link to="/criar-receita">Criar Nova Receita</Link></li>
            <li><Link to="/criar-artigo">Cadastrar Artigo</Link></li>
            <li><Link to="/criar-refeicao">Cadastrar Refeição</Link></li>
            <li><Link to="/criar-plano-alimentar">Cadastrar Plano Alimentar</Link></li>
            <li><Link to="/criar-postagem">Cadastrar Postagem</Link></li>
            <li><Link to="/categorias-receitas">Listar Categorias de Receitas</Link></li>
            <li><Link to="/criar-categoria-receita">Criar Categoria de Receita</Link></li>
            <li><Link to="/editar-postagem/:id">Editar Postagem</Link></li>
            <li><Link to="/editar-categoria-receita/:id">Editar Categoria de Receita</Link></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
