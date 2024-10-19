import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarReceita() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagem, setImagem] = useState(null);
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
    const receitaData = new FormData();
    receitaData.append('titulo', titulo);
    receitaData.append('descricao', descricao);
    receitaData.append('modo_preparo', modoPreparo);
    receitaData.append('tempo_preparo', parseInt(tempoPreparo));
    receitaData.append('dificuldade', dificuldade);
    receitaData.append('categoria', parseInt(categoriaId));
    if (imagem) {
      receitaData.append('imagem', imagem);
    }
    console.log('Dados da receita:', receitaData);
    try {
      const response = await axios.post('http://localhost:8000/api/receitas/', receitaData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Resposta do servidor:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao criar receita:', error);
      if (error.response) {
        console.error('Detalhes do erro:', error.response.data);
      }
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
        <div>
          <label>Imagem:</label>
          <input type="file" onChange={(e) => setImagem(e.target.files[0])} required />
        </div>
        <button type="submit">Criar Receita</button>
      </form>
    </div>
  );
}

export default CriarReceita;
