import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarCategoriasReceitas() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categorias-receitas/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias de receitas:', error);
    }
  };

  return (
    <div>
      <h2>Categorias de Receitas</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            <Link to={`/categoria-receita/${categoria.id}`}>{categoria.nome}</Link>
          </li>
        ))}
      </ul>
      <Link to="/criar-categoria-receita">Criar Nova Categoria</Link>
    </div>
  );
}

export default ListarCategoriasReceitas;
