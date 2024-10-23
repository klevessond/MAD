import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarReceita.css';

function EditarReceita() {
  const [receita, setReceita] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [modoPreparo, setModoPreparo] = useState('');
  const [tempoPreparo, setTempoPreparo] = useState('');
  const [dificuldade, setDificuldade] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [novasImagens, setNovasImagens] = useState([]);
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
      const receitaData = response.data;
      setReceita(receitaData);
      setTitulo(receitaData.titulo);
      setDescricao(receitaData.descricao);
      setModoPreparo(receitaData.modo_preparo);
      setTempoPreparo(receitaData.tempo_preparo);
      setDificuldade(receitaData.dificuldade);
      setCategoriaId(receitaData.categoria);
    } catch (error) {
      console.error('Erro ao buscar receita:', error);
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
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('descricao', descricao);
    formData.append('modo_preparo', modoPreparo);
    formData.append('tempo_preparo', tempoPreparo);
    formData.append('dificuldade', dificuldade);
    formData.append('categoria', categoriaId);
    
    novasImagens.forEach((imagem, index) => {
      formData.append(`novas_imagens[${index}]`, imagem);
    });

    try {
      await axios.put(`http://localhost:8000/api/receitas/${id}/`, formData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate(`/DetalharReceita/${id}`);
    } catch (error) {
      console.error('Erro ao atualizar receita:', error);
    }
  };

  const handleImagemDelete = async (imagemId) => {
    try {
      await axios.delete(`http://localhost:8000/api/imagens-receitas/${imagemId}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      fetchReceita(); // Recarrega a receita para atualizar as imagens
    } catch (error) {
      console.error('Erro ao excluir imagem:', error);
    }
  };

  const handleNovasImagens = (e) => {
    setNovasImagens([...novasImagens, ...e.target.files]);
  };

  if (!receita) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="editar-receita">
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
        <div>
          <label>Imagens atuais:</label>
          <div className="imagens-atuais">
            {receita.imagens && receita.imagens.map((imagem) => (
              <div key={imagem.id} className="imagem-item">
                <img src={imagem.url_imagem_completa} alt={`Imagem ${imagem.id}`} />
                <button type="button" onClick={() => handleImagemDelete(imagem.id)}>Excluir</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Adicionar novas imagens:</label>
          <input type="file" multiple onChange={handleNovasImagens} />
        </div>
        <button type="submit">Atualizar Receita</button>
      </form>
    </div>
  );
}

export default EditarReceita;
