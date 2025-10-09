import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './application/api.js'

function App() {
  api.get("/reservations").then((res) => console.log(res));
  return (
    <>
    </>
  )
}

export default App
