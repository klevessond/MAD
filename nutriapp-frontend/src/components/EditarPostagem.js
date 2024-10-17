import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPostagem() {
  const [conteudo, setConteudo] = useState('');
  const [imagem, setImagem] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostagem();
  }, [id]);

  const fetchPostagem = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setConteudo(response.data.conteudo);
      setImagem(response.data.imagem || '');
    } catch (error) {
      console.error('Erro ao buscar detalhes da postagem:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
        conteudo,
        imagem
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/postagem/${id}`);
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPostagem;

