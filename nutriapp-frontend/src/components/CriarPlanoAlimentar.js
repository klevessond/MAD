import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarPlanoAlimentar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [publico, setPublico] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/planos-alimentares/', {
        titulo,
        descricao,
        publico
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate('/planos-alimentares');
    } catch (error) {
      console.error('Erro ao criar plano alimentar:', error);
    }
  };

  return (
    <div>
      <h2>Criar Novo Plano Alimentar</h2>
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
          <label>
            <input type="checkbox" checked={publico} onChange={(e) => setPublico(e.target.checked)} />
            Público
          </label>
        </div>
        <button type="submit">Criar Plano Alimentar</button>
      </form>
    </div>
  );
}

export default CriarPlanoAlimentar;
