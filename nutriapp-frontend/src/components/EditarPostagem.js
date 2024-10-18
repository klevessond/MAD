import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPostagem() {
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState('');
  const [refeicaoId, setRefeicaoId] = useState('');
  const [refeicoes, setRefeicoes] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostagem();
    fetchRefeicoes();
  }, [id]);

  const fetchPostagem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      const postagem = response.data;
      setConteudo(postagem.conteudo);
      setImagem(postagem.imagem || '');
      setRefeicaoId(postagem.refeicao || '');
    } catch (error) {
      console.error('Erro ao buscar detalhes da postagem:', error);
    }
  };

  const fetchRefeicoes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/refeicoes/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRefeicoes(response.data);
    } catch (error) {
      console.error('Erro ao buscar refeições:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
        conteudo,
        imagem,
        refeicao: refeicaoId || null
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/postagens');
    } catch (error) {
      console.error('Erro ao editar postagem:', error);
    }
  };

  return (
    <div>
      <h2>Editar Postagem</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Conteúdo:</label>
          <textarea 
            value={conteudo} 
            onChange={(e) => setConteudo(e.target.value)} 
            required
          />
        </div>
        <div>
          <label>URL da Imagem:</label>
          <input 
            type="text" 
            value={imagem} 
            onChange={(e) => setImagem(e.target.value)} 
          />
        </div>
        <div>
          <label>Refeição (opcional):</label>
          <select 
            value={refeicaoId} 
            onChange={(e) => setRefeicaoId(e.target.value)}
          >
            <option value="">Selecione uma refeição</option>
            {refeicoes.map(refeicao => (
              <option key={refeicao.id} value={refeicao.id}>{refeicao.nome}</option>
            ))}
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPostagem;
