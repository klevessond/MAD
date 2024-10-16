
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditarPlanoAlimentar() {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [publico, setPublico] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlano();
  }, [id]);

  const fetchPlano = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/planos-alimentares/${id}/`, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setTitulo(response.data.titulo);
      setDescricao(response.data.descricao);
      setPublico(response.data.publico);
    } catch (error) {
      console.error('Erro ao buscar detalhes do plano alimentar:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/planos-alimentares/${id}/`, {
        titulo,
        descricao,
        publico
      }, {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      navigate(`/plano-alimentar/${id}`);
    } catch (error) {
      console.error('Erro ao editar plano alimentar:', error);
    }
  };

  return (
    <div>
      <h2>Editar Plano Alimentar</h2>
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
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  );
}

export default EditarPlanoAlimentar;