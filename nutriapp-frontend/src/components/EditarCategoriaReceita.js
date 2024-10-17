import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarCategoriaReceita() {
  const [nome, setNome] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoria();
  }, [id]);

  const fetchCategoria = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/categorias-receitas/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setNome(response.data.nome);
    } catch (error) {
      console.error('Erro ao buscar detalhes da categoria:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/categorias-receitas/${id}/`, {
        nome
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/categorias-receitas');
    } catch (error) {
      console.error('Erro ao editar categoria de receita:', error);
    }
  };

  return (
    <div>
      <h2>Editar Categoria de Receita</h2>
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarCategoriaReceita;
