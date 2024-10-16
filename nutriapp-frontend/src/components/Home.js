import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchUserData();
      fetchRecipes();
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

  const fetchRecipes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/recipes/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRecipes(response.data);
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
        {recipes.map(recipe => (
          <li key={recipe.id}>{recipe.title}</li>
        ))}
      </ul>
      {user && user.user_type === 'nutricionista' && (
        <Link to="/create-recipe">Criar Nova Receita</Link>
      )}
    </div>
  );
}

export default Home;