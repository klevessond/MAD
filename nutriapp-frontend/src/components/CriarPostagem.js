import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarPostagem() {
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState('');
  const [refeicaoId, setRefeicaoId] = useState('');
  const [refeicoes, setRefeicoes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRefeicoes();
  }, []);

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
      await axios.post('http://localhost:8000/api/postagens-usuarios/', {
        conteudo,
        imagem,
        refeicao: refeicaoId || null
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/ListarPostagens');
    } catch (error) {
      console.error('Erro ao criar postagem:', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Postagem</h2>
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
        <button type="submit">Criar Postagem</button>
      </form>
    </div>
  );
}

export default CriarPostagem;
