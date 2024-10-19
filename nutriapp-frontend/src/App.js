import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CriarReceita from './components/CriarReceita';
import CriarPlanoAlimentar from './components/CriarPlanoAlimentar';
import CriarArtigo from './components/CriarArtigo';
import CriarRefeicao from './components/CriarRefeicao';
import CriarPostagem from './components/CriarPostagem';
import EditarPostagem from './components/EditarPostagem';
import ListarCategoriasReceitas from './components/ListarCategoriasReceitas';
import CriarCategoriaReceita from './components/CriarCategoriaReceita';
import EditarCategoriaReceita from './components/EditarCategoriaReceita';
import ListarReceitas from './components/ListarReceitas';
import EditarReceita from './components/EditarReceita';
import CriarCategoriaArtigo from './components/CriarCategoriaArtigo';
import ListarCategoriasArtigo from './components/ListarCategoriasArtigo';
import EditarCategoriaArtigo from './components/EditarCategoriaArtigo';
import ListarArtigos from './components/ListarArtigos';
import EditarArtigo from './components/EditarArtigo';
import ListarRefeicoes from './components/ListarRefeicoes';
import EditarRefeicao from './components/EditarRefeicao';
import ListarPlanoAlimentar from './components/ListarPlanoAlimentar';
import EditarPlanoAlimentar from './components/EditarPlanoAlimentar';
import ListarPostagens from './components/ListarPostagens';
import DetalharReceita from './components/DetalharReceita';
import DetalharRefeicao from './components/DetalharRefeicao';
import DetalharPlanoAlimentar from './components/DetalharPlanoAlimentar';
import DetalharArtigo from './components/DetalharArtigo';
import DetalharCategoriaReceita from './components/DetalharCategoriaReceita';
import DetalharCategoriaArtigo from './components/DetalharCategoriaArtigo';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/CriarReceita" element={<CriarReceita />} />
          <Route path="/ListarReceitas" element={<ListarReceitas />} />          
          <Route path="/CriarArtigo" element={<CriarArtigo />} />
          <Route path="/ListarArtigos" element={<ListarArtigos />} />
          <Route path="/CriarRefeicao" element={<CriarRefeicao />} />
          <Route path="/ListarRefeicoes" element={<ListarRefeicoes />} />
          <Route path="/CriarPostagem" element={<CriarPostagem />} />
          <Route path="/ListarPostagens" element={<ListarPostagens />} />
          <Route path="/EditarPostagem/:id" element={<EditarPostagem />} />
          <Route path="/ListarCategoriasReceitas" element={<ListarCategoriasReceitas />} />
          <Route path="/CriarCategoriaReceita" element={<CriarCategoriaReceita />} />
          <Route path="/EditarCategoriaReceita/:id" element={<EditarCategoriaReceita />} />          
          <Route path="/EditarReceita/:id" element={<EditarReceita />} />
          <Route path="/ListarCategoriasArtigo" element={<ListarCategoriasArtigo />} />
          <Route path="/CriarCategoriaArtigo" element={<CriarCategoriaArtigo />} />
          <Route path="/EditarCategoriaArtigo/:id" element={<EditarCategoriaArtigo />} />
          <Route path="/EditarArtigo/:id" element={<EditarArtigo />} />
          <Route path="/EditarRefeicao/:id" element={<EditarRefeicao />} />
          <Route path="/ListarPlanoAlimentar" element={<ListarPlanoAlimentar />} />
          <Route path="/CriarPlanoAlimentar" element={<CriarPlanoAlimentar />} />
          <Route path="/EditarPlanoAlimentar/:id" element={<EditarPlanoAlimentar />} />
          <Route path="/DetalharReceita/:id" element={<DetalharReceita />} />
          <Route path="/DetalharRefeicao/:id" element={<DetalharRefeicao />} />
          <Route path="/DetalharPlanoAlimentar/:id" element={<DetalharPlanoAlimentar />} />
          <Route path="/DetalharArtigo/:id" element={<DetalharArtigo />} />
          <Route path="/DetalharCategoriaReceita/:id" element={<DetalharCategoriaReceita />} />
          <Route path="/DetalharCategoriaArtigo/:id" element={<DetalharCategoriaArtigo />} />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
