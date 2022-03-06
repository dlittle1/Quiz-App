import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EndGame from './pages/EndGame'
import Questions from './pages/Questions'
import WelcomeScreen from './pages/WelcomeScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<WelcomeScreen />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/endGame' element={<EndGame />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
