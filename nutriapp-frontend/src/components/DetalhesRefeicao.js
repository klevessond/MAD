import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function DetalhesRefeicao() {
  const [refeicao, setRefeicao] = useState(null);
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRefeicao();
    fetchComentarios();
  }, [id]);

  const fetchRefeicao = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/refeicoes/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setRefeicao(response.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes da refeição:', error);
    }
  };

  const fetchComentarios = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/comentarios-refeicoes/?refeicao=${id}`, {
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
      await axios.post('http://localhost:8000/api/comentarios-refeicoes/', {
        refeicao: id,
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

  const handleEditar = () => {
    navigate(`/editar-refeicao/${id}`);
  };

  if (!refeicao) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h2>{refeicao.nome}</h2>
      <p>{refeicao.descricao}</p>
      <p>Horário: {refeicao.horario}</p>
      <p>Tipo: {refeicao.tipo}</p>
      <button onClick={handleEditar}>Editar Refeição</button>

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

export default DetalhesRefeicao;