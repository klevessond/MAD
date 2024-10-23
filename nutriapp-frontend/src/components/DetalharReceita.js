import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DetalharReceita() {
  const [receita, setReceita] = useState(null);
  const { id } = useParams();

  useEffect(() => {
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

    fetchReceita();
  }, [id]);

  if (!receita) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="detalhes-receita">
      <h2>{receita.titulo}</h2>
      
      {receita.imagens && receita.imagens.length > 0 && (
        <img 
          src={receita.imagens[0].url_imagem_completa} 
          alt={receita.titulo} 
          className="imagem-receita"
        />
      )}
      
      <p><strong>Descrição:</strong> {receita.descricao}</p>
      <p><strong>Modo de Preparo:</strong> {receita.modo_preparo}</p>
      <p><strong>Tempo de Preparo:</strong> {receita.tempo_preparo} minutos</p>
      <p><strong>Dificuldade:</strong> {receita.dificuldade}</p>
      <p><strong>Categoria:</strong> {receita.categoria}</p>
      
      <Link to="/">Voltar para a lista de receitas</Link>
    </div>
  );
}

export default DetalharReceita;
