import { useEffect, useState } from "react"
import Api from "../application/api"

const AdminPage = () => {

  const [reservations, setReservations] = useState([]);

  const getReservations = async () => {
    let result = await Api.getReservationsAsync();
    console.log(result);
    setReservations(result);
  }

  const deleteReservation = async (id) => {
    let result = await Api.deleteReservationAsync(id);
    console.log(result);
    if(result.success) {
      let newList = reservations.filter((reservation) => reservation.reservationId !== id);
      console.log(newList);
      setReservations(newList);
    }
  }

  const editReservation = async (id) => {
    // let result = await Api.editReservationAsync(data, id);
    // console.log(result);
  }

  useEffect(() => {
    getReservations();
  }, [])

  return (
    <>
      <header>
        <h1>AdminPage</h1>
      </header>
      <section>
        <article>
          <header>
            <h2>Reservations</h2>
          </header>
          <ul>
            {reservations && reservations.length > 0 ?
              reservations.map((reservation) => {
                return (
                  <li key={reservation.id} className="card">
                    <div className="row">
                      <div className="column">
                        <h3>{reservation.firstName} {reservation.lastName}</h3>
                        <p><strong>Check In:</strong> {reservation.checkIn.split("T")[0]} | <strong>Check Out:</strong> {reservation.checkOut.split("T")[0]}</p>
                      </div>
                      <div className="btn-container">
                        <button className="btn" onClick={() => editReservation(reservation.reservationId)}>Edit</button>
                        <button className="btn" onClick={() => deleteReservation(reservation.reservationId)}>Delete</button>
                      </div>
                    </div>
                  </li>
                )
              })
              :
              <li>
                <p>There are no reservations</p>
              </li>
            }
          </ul>
        </article>
      </section>
    </>
  )
}

export default AdminPage