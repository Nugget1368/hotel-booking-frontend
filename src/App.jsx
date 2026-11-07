import './App.css'
import BookingForms from './components/forms/BookingForms'
import HotelsPage from './pages/HotelsPage'
import Header from './components/Header/Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <div id="App">
            <Header />
            <HotelsPage />
          </div>
        </>
        } />
        <Route path="/booking" element={
          <>
            <div id="App">
              <Header />
              <BookingForms />
            </div>
          </>
        } />
        <Route path="/profile/login" element={
          <>
            <div id="App">
              <Header />
              <LoginPage />
            </div>
          </>
        } />
        <Route path="/admin/dashboard" element={
          <>
            <div id="App">
              <Header />
              <AdminPage />
            </div>
          </>
        } />
        <Route path="*" element={<h1>404 Not found friend...</h1>} />
      </Routes>
    </Router>
  )
}

export default App
