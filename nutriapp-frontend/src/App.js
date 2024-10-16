import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import CriarReceita from './components/CriarReceita';
import DetalhesReceita from './components/DetalhesReceita';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
