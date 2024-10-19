import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetalharCategoriaReceita() {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categorias-receitas/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        setCategoria(response.data);
      } catch (error) {
        console.error('Erro ao buscar categoria de receita:', error);
      }
    };
    fetchCategoria();
  }, [id]);

  if (!categoria) return <div>Carregando...</div>;

  return (
    <div>
      <h2>{categoria.nome}</h2>
      <p><strong>Descrição:</strong> {categoria.descricao}</p>
      {/* Adicione outros campos conforme necessário */}
    </div>
  );
}

export default DetalharCategoriaReceita;
