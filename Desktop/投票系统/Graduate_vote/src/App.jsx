import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Show from './pages/show'
import Vote from './pages/vote'
import Waiting from './pages/waiting'
import Set from './pages/set'
import { Routes, Route, Link, useParams, useLocation, Navigate } from "react-router-dom"
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/vote' />} />
        <Route path='/vote' element={<Vote />} />
        <Route path='/show' element={<Show />} />
        <Route path='/waiting' element={<Waiting />} />
        <Route path='/set' element={<Set />} />
      </Routes>
    </div>
  )
}

export default App
