import './App.css'
import api from './application/api.js'

function App() {

  const reservation = async () => {
    let data = {
      "firstName": "Bruce",
      "lastName": "Wayne",
      "email": "notbatman@gmail.com",
      "phone": "1234567890",
      "roomType": "single",
      "checkIn": "2025-11-01",
      "checkOut": "2025-11-05"
    }
    let response = await api.makeReservationAsync(data);
  }

return (
  <>
    <button onClick={reservation}>Make Reservation</button>
  </>
)
}

export default App
