import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CriarReceita from './components/CriarReceita';
import DetalhesReceita from './components/DetalhesReceita';
import CriarPlanoAlimentar from './components/CriarPlanoAlimentar';
import DetalhesPlanoAlimentar from './components/DetalhesPlanoAlimentar';
import CriarArtigo from './components/CriarArtigo';
import DetalhesArtigo from './components/DetalhesArtigo';
import CriarRefeicao from './components/CriarRefeicao';
import DetalhesRefeicao from './components/DetalhesRefeicao';
import CriarPostagem from './components/CriarPostagem';
import DetalhesPostagem from './components/DetalhesPostagem';
import EditarPostagem from './components/EditarPostagem';
import ListarCategoriasReceitas from './components/ListarCategoriasReceitas';
import CriarCategoriaReceita from './components/CriarCategoriaReceita';
import EditarCategoriaReceita from './components/EditarCategoriaReceita';
import ListarReceitas from './components/ListarReceitas';
import EditarReceita from './components/EditarReceita';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/criar-receita" element={<CriarReceita />} />
          <Route path="/receita/:id" element={<DetalhesReceita />} />
          <Route path="/criar-plano-alimentar" element={<CriarPlanoAlimentar />} />
          <Route path="/plano-alimentar/:id" element={<DetalhesPlanoAlimentar />} />
          <Route path="/criar-artigo" element={<CriarArtigo />} />
          <Route path="/artigo/:id" element={<DetalhesArtigo />} />
          <Route path="/criar-refeicao" element={<CriarRefeicao />} />
          <Route path="/refeicao/:id" element={<DetalhesRefeicao />} />
          <Route path="/criar-postagem" element={<CriarPostagem />} />
          <Route path="/postagem/:id" element={<DetalhesPostagem />} />
          <Route path="/editar-postagem/:id" element={<EditarPostagem />} />
          <Route path="/categorias-receitas" element={<ListarCategoriasReceitas />} />
          <Route path="/criar-categoria-receita" element={<CriarCategoriaReceita />} />
          <Route path="/editar-categoria-receita/:id" element={<EditarCategoriaReceita />} />
          <Route path="/receitas" element={<ListarReceitas />} />
          <Route path="/editar-receita/:id" element={<EditarReceita />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
