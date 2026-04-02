import { useState } from 'react'
import { PageOne, Hello } from './Components/Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Hello />} />
        <Route path="login" element={<PageOne />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
