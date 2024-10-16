import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalhesReceita() {
  const [receita, setReceita] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetchReceita();
    fetchComentarios();
  }, [id]);

  const fetchReceita = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/receitas/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setReceita(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da receita:', error);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/comentarios-receitas/?receita=${id}`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setComentarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar comentários:', error);
    }
  };

  const handleSubmitComentario = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/comentarios-receitas/', {
        receita: id,
        texto: novoComentario
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setNovoComentario('');
      fetchComentarios();
    } catch (error) {
      console.error('Erro ao adicionar comentário:', error);
    }
  };

  if (!receita) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{receita.titulo}</h2>
      <p>{receita.descricao}</p>
      <h3>Modo de Preparo</h3>
      <p>{receita.modo_preparo}</p>
      <p>Tempo de Preparo: {receita.tempo_preparo} minutos</p>
      <p>Dificuldade: {receita.dificuldade}</p>

      <h3>Comentários</h3>
      <ul>
        {comentarios.map(comentario => (
          <li key={comentario.id}>{comentario.texto}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmitComentario}>
        <textarea 
          value={novoComentario} 
          onChange={(e) => setNovoComentario(e.target.value)}
          placeholder="Adicione um comentário"
          required
        />
        <button type="submit">Enviar Comentário</button>
      </form>
    </div>
  );
}

export default DetalhesReceita;

