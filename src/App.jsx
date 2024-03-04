import { useState, useEffect, useContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import './App.css'
import theme from './themes/theme';
import Header from './components/Header'
import NavBar from './components/NavBar'
import Home from './pages/home';
import Submit_Article from './pages/submit_article';
import View_Article from './pages/view_article';
import Unknown_Path from './pages/unknown_path';

import { getUserByUsername } from './utils/api';
import { CurrentUserContext } from '../src/contexts/CurrentUser';

function App() {
  const [currentArticle, setCurrentArticle] = useState({})
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext)

  useEffect(()=>{
    const selectedUser = 'weegembump'
    getUserByUsername(selectedUser).then((userData)=>{
      setCurrentUser(userData)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
    <Header />
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} setCurrentArticle={setCurrentArticle} />
        <Route path="/articles/:topic_name" element={<Home />} setCurrentArticle={setCurrentArticle} />
        <Route path="/submit" element={<Submit_Article />} />
        <Route path="/:article_id" element={<View_Article />} />
        <Route path="*" element={<Unknown_Path />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
