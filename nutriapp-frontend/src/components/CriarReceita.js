import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarReceita() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const navigate = useNavigate();

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
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/receitas/', {
        titulo,
        descricao,
        modo_preparo: modoPreparo,
        tempo_preparo: parseInt(tempoPreparo),
        dificuldade,
        categoria: parseInt(categoriaId)
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar receita:', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Receita</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Modo de Preparo:</label>
          <textarea value={modoPreparo} onChange={(e) => setModoPreparo(e.target.value)} required />
        </div>
        <div>
          <label>Tempo de Preparo (minutos):</label>
          <input type="number" value={tempoPreparo} onChange={(e) => setTempoPreparo(e.target.value)} required />
        </div>
        <div>
          <label>Dificuldade:</label>
          <select value={dificuldade} onChange={(e) => setDificuldade(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="facil">Fácil</option>
            <option value="medio">Médio</option>
            <option value="dificil">Difícil</option>
          </select>
        </div>
        <div>
          <label>Categoria:</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
            <option value="">Selecione...</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Receita</button>
      </form>
    </div>
  );
}

export default CriarReceita;