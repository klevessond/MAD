import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CriarArtigo() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [imagem, setImagem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categorias-artigos/', {
        headers: { Authorization: `Token ${localStorage.getItem('token')}` }
      });
      setCategorias(response.data);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artigoData = new FormData();
    artigoData.append('titulo', titulo);
    artigoData.append('conteudo', conteudo);
    artigoData.append('categoria', parseInt(categoriaId));
    if (imagem) {
      artigoData.append('imagem', imagem);
    }
    try {
      await axios.post('http://localhost:8000/api/artigos/', artigoData, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/artigos');
    } catch (error) {
      console.error('Erro ao criar artigo:', error);
    }
  };

  return (
    <div>
      <h2>Criar Novo Artigo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </div>
        <div>
          <label>Conteúdo:</label>
          <textarea value={conteudo} onChange={(e) => setConteudo(e.target.value)} required />
        </div>
        <div>
          <label>Categoria:</label>
          <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
            <option value="">Selecione uma categoria</option>
            {categorias.map(categoria => (
              <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Imagem:</label>
          <input type="file" onChange={(e) => setImagem(e.target.files[0])} required />
        </div>
        <button type="submit">Criar Artigo</button>
      </form>
    </div>
  );
}

export default CriarArtigo;
