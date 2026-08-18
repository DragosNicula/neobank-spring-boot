import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import './App.css'

function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
