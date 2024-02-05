import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/home';
import Submit_Article from './pages/submit_article';
import View_Article from './pages/view_article';

function App() {
  const [currentArticle, setCurrentArticle] = useState({})

  return (
    <>
    <Header />
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} setCurrentArticle={setCurrentArticle} />
        <Route path="/submit" element={<Submit_Article />} />
        <Route path="/:article_id" element={<View_Article />} />
      </Routes>
    </>
  )
}

export default App
