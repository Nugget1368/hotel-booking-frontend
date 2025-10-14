import './App.css'
import BookingForms from './components/forms/BookingForms'
import HotelsPage from './pages/HotelsPage'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={ <>
          <Header />
          <HotelsPage />
          </> 
          } />
          <Route path="/booking" element={<BookingForms />} />
          <Route path="/profile/login" element={<LoginPage />} />
          <Route path="*" element={<h1>404 Not found friend...</h1>} />
        </Routes>
      </Router>
  )
}

export default App
