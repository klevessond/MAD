import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarReceita() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchReceita();
    fetchCategorias();
  }, [id]);

  const fetchReceita = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/receitas/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      const receita = response.data;
      setTitulo(receita.titulo);
      setDescricao(receita.descricao);
      setModoPreparo(receita.modo_preparo);
      setTempoPreparo(receita.tempo_preparo.toString());
      setDificuldade(receita.dificuldade);
      setCategoriaId(receita.categoria.toString());
    } catch (error) {
      console.error('Erro ao buscar detalhes da receita:', error);
    }
  };

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
      await axios.put(`http://localhost:8000/api/receitas/${id}/`, {
        titulo,
        descricao,
        modo_preparo: modoPreparo,
        tempo_preparo: parseInt(tempoPreparo),
        dificuldade,
        categoria: parseInt(categoriaId)
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/receita/${id}`);
    } catch (error) {
      console.error('Erro ao editar receita:', error);
    }
  };

  return (
    <div>
      <h2>Editar Receita</h2>
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarReceita;
