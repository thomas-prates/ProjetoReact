import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.js';
import BookForm from './components/BookForm/BookForm.js';
import BookList from './components/BookList/BookList.js';
import Home from './pages/home.jsx';
import Sobre from './pages/sobre.jsx'
import "./App.css"


function App() {


  return (

    <div>
      
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/ListaDeLivros" element={<BookList />} />
          <Route path="/Cadastrar" element={<BookForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
