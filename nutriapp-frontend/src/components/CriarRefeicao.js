import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarRefeicao() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horario, setHorario] = useState('');
  const [tipo, setTipo] = useState('');
  const [planoId, setPlanoId] = useState('');
  const [receitaId, setReceitaId] = useState('');
  const [planos, setPlanos] = useState([]);
  const [receitas, setReceitas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlanos();
    fetchReceitas();
  }, []);

  const fetchPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/planos-alimentares/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPlanos(response.data);
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
    }
  };

  const fetchReceitas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/receitas/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setReceitas(response.data);
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/refeicoes/', {
        nome,
        descricao,
        horario,
        tipo,
        plano: parseInt(planoId),
        receita: parseInt(receitaId)
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/refeicoes');
    } catch (error) {
      console.error('Erro ao criar refeição:', error);
    }
  };

  return (
    <div>
      <h2>Criar Nova Refeição</h2>
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
            <option value="">Selecione um tipo</option>
            <option value="cafe_da_manha">Café da Manhã</option>
            <option value="lanche_da_manha">Lanche da Manhã</option>
            <option value="almoco">Almoço</option>
            <option value="lanche_da_tarde">Lanche da Tarde</option>
            <option value="janta">Janta</option>
            <option value="ceia">Ceia</option>
          </select>
        </div>
        <div>
          <label>Plano Alimentar:</label>
          <select value={planoId} onChange={(e) => setPlanoId(e.target.value)} required>
            <option value="">Selecione um plano</option>
            {planos.map(plano => (
              <option key={plano.id} value={plano.id}>{plano.titulo}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Receita:</label>
          <select value={receitaId} onChange={(e) => setReceitaId(e.target.value)} required>
            <option value="">Selecione uma receita</option>
            {receitas.map(receita => (
              <option key={receita.id} value={receita.id}>{receita.titulo}</option>
            ))}
          </select>
        </div>
        <button type="submit">Criar Refeição</button>
      </form>
    </div>
  );
}

export default CriarRefeicao;
