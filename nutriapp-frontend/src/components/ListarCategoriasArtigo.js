import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarCategoriasArtigo() {
  const [categorias, setCategorias] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchCategorias();
    fetchUsuarioLogado();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categorias-artigos/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias de artigos:', error);
    }
  };

  const fetchUsuarioLogado = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setUsuarioLogado(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuário logado:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      try {
        await axios.delete(`http://localhost:8000/api/categorias-artigos/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        fetchCategorias();
      } catch (error) {
        console.error('Erro ao excluir categoria:', error);
      }
    }
  };

  return (
    <div>
      <h2>Categorias de Artigos</h2>
      <ul>
        {categorias.map(categoria => (
          <li key={categoria.id}>
            <Link to={`/DetalharCategoriaArtigo/${categoria.id}`}>{categoria.nome}</Link>
            {usuarioLogado && usuarioLogado.is_staff && (
              <>
                <Link to={`/EditarCategoriaReceita/${categoria.id}`}> (Editar)</Link>
                <button onClick={() => handleDelete(categoria.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <Link to="/CriarCategoriaArtigo">Criar Nova Categoria</Link>
    </div>
  );
}

export default ListarCategoriasArtigo;
