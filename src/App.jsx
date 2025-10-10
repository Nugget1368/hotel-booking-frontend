import './App.css'
import BookingForms from './components/forms/BookingForms'
import HotelsPage from './pages/HotelsPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router'

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelsPage />} />
        <Route path="/booking" element={<BookingForms />} />
        <Route path="*" element={<h1>404 Not found friend...</h1>} />
      </Routes>
    </Router>
  )
}

export default App
