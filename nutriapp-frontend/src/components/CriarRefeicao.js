import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function CriarRefeicao() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const { planoId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/refeicoes/', {
        nome,
        descricao,
        horario,
        tipo,
        plano: planoId
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/plano-alimentar/${planoId}`);
    } catch (error) {
      console.error('Erro ao criar refeição:', error);
    }
  };

  return (
    <div>
      <h2>Adicionar Nova Refeição</h2>
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
        <button type="submit">Adicionar Refeição</button>
      </form>
    </div>
  );
}

export default CriarRefeicao;