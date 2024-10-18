import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ListarPostagens() {
  const [postagens, setPostagens] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    fetchPostagens();
    fetchUsuarioLogado();
  }, []);

  const fetchPostagens = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/postagens-usuarios/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setPostagens(response.data);
    } catch (error) {
      console.error('Erro ao buscar postagens:', error);
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
    if (window.confirm('Tem certeza que deseja excluir esta postagem?')) {
      try {
        await axios.delete(`http://localhost:8000/api/postagens-usuarios/${id}/`, {
          headers: { Authorization: `Token ${localStorage.getItem('token')}` }
        });
        fetchPostagens();
      } catch (error) {
        console.error('Erro ao excluir postagem:', error);
      }
    }
  };

  return (
    <div>
      <h2>Postagens</h2>
      {postagens.map(postagem => (
        <div key={postagem.id}>
          <p><strong>{postagem.autor_nome}</strong>: {postagem.conteudo}</p>
          {postagem.imagem && <img src={postagem.imagem} alt="Imagem da postagem" style={{maxWidth: '300px'}} />}
          {postagem.refeicao_nome && <p>Refeição: {postagem.refeicao_nome}</p>}
          <p>Data: {new Date(postagem.data_publicacao).toLocaleString()}</p>
          {usuarioLogado && usuarioLogado.id === postagem.autor && (
            <>
              <Link to={`/editar-postagem/${postagem.id}`}>Editar</Link>
              <button onClick={() => handleDelete(postagem.id)}>Excluir</button>
            </>
          )}
          <hr />
        </div>
      ))}
      <Link to="/criar-postagem">Criar Nova Postagem</Link>
    </div>
  );
}

export default ListarPostagens;
