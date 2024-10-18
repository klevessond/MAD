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
            <h5>Receitas</h5>
            <li><Link to="/CriarReceita">Criar Nova Receita</Link></li>
            <li><Link to="/ListarReceitas">Listar Receitas</Link></li>
            <li><Link to="/criar-categoria-receita">Criar Categoria de Receita</Link></li>
            <li><Link to="/categorias-receitas">Listar Categorias de Receitas</Link></li>
            <h5>Artigos</h5>
            <li><Link to="/CriarArtigo">Cadastrar Artigo</Link></li>
            <li><Link to="/ListarArtigos">Listar Artigos</Link></li>
            <li><Link to="/ListarCategoriasReceitas">Listar Categorias de Artigos</Link></li>
            <li><Link to="/CriarCategoriaReceita">Criar Categoria de Artigo</Link></li>
            <h5>Refeições</h5>
            <li><Link to="/CriarRefeicao">Cadastrar Refeição</Link></li>
            <li><Link to="/ListarRefeicoes">Listar Refeições</Link></li>
            
            <h5>Plano Alimentar</h5>
            <li><Link to="/CriarPlanoAlimentar">Cadastrar Plano Alimentar</Link></li>
            <li><Link to="/ListarPlanoAlimentar">Listar Planos Alimentares</Link></li>
            
            <h5>Postagens</h5>
            <li><Link to="/CriarPostagem">Cadastrar Postagem</Link></li>
            <li><Link to="/EditarPostagem/:id">Editar Postagem</Link></li>
            <li><Link to="/ListarPostagens">Listar Postagens</Link></li>


            

            
            
          </ul>
        </div>
      )}
    </div>
  );
}

export default Home;
