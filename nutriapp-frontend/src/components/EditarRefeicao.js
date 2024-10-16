import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarRefeicao() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRefeicao();
  }, [id]);

  const fetchRefeicao = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/refeicoes/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setNome(response.data.nome);
      setDescricao(response.data.descricao);
      setHorario(response.data.horario);
      setTipo(response.data.tipo);
    } catch (error) {
      console.error('Erro ao buscar detalhes da refeição:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/refeicoes/${id}/`, {
        nome,
        descricao,
        horario,
        tipo
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/refeicao/${id}`);
    } catch (error) {
      console.error('Erro ao editar refeição:', error);
    }
  };

  return (
    <div>
      <h2>Editar Refeição</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
        </div>
        <div>
          <label>Horário:</label>
          <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="cafe_da_manha">Café da Manhã</option>
            <option value="lanche_da_manha">Lanche da Manhã</option>
            <option value="almoco">Almoço</option>
            <option value="lanche_da_tarde">Lanche da Tarde</option>
            <option value="janta">Janta</option>
            <option value="ceia">Ceia</option>
          </select>
        </div>
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarRefeicao;