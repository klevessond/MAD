import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarCategoriaReceita() {
  const [nome, setNome] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/categorias-receitas/', {
        nome
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/categorias-receitas');
    } catch (error) {
      console.error('Erro ao criar categoria de receita:', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Categoria de Receita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome da Categoria:</label>
          <input 
            type="text" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Criar Categoria</button>
      </form>
    </div>
  );
}

export default CriarCategoriaReceita;

