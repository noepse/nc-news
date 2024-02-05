import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import NavBar from './components/NavBar'
import Topics from './components/Topics'
import Articles from './components/Articles'

function App() {

  return (
    <>
    <Header />
    <NavBar />
    <Topics />
    <Articles />
    </>
  )
}

export default App
