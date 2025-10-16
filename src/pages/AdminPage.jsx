import { useEffect, useState } from "react"
import Api from "../application/api"

const AdminPage = () => {

  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    roomType: "",
    checkIn: "",
    checkOut: ""
  });

  const toggleEditMode = (id) => {
    setEditId(id);
    setEditMode(!editMode);
    setEditData({
      roomType: "",
      checkIn: "",
      checkOut: ""
    });
  }

  const getReservations = async () => {
    let result = await Api.getReservationsAsync();
    setReservations(result);
  }

  const deleteReservation = async (id) => {
    let result = await Api.deleteReservationAsync(id);
    if (result.success) {
      let newList = reservations.filter((reservation) => reservation.reservationId !== id);
      setReservations(newList);
    }
    else {
      alert("Could not delete reservation.");
    }
  }

  const editReservation = async (reservation) => {
    Object.keys(editData).forEach(key => {
      if (editData[key] === "")
        editData[key] = reservation[key].split("T")[0];
    })    
    let id = reservation.reservationId;
    let result = await Api.editReservationAsync(id, editData);
    if(result.success){
      let newList = reservations.map((r) => r.reservationId === reservation.reservationId ? result.reservation : r);
      setReservations(newList);
      toggleEditMode(null);
    }
    else{
      alert("Could not edit reservation.");
    }
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
                  <li key={reservation.reservationId} className="card">
                    <div className="row">
                      <div className="column">
                        <h3>{reservation.firstName} {reservation.lastName}</h3>
                        { editMode && editId === reservation.reservationId ?
                          <p><strong>Room Type:</strong> <input type="text" placeholder={reservation.roomType} defaultValue={reservation.roomType} onChange={(e) => setEditData({ ...editData, roomType: e.target.value })} /></p>
                          :
                          <p><strong>Room Type:</strong> {reservation.roomType}</p>
                        }
                        {editMode && editId === reservation.reservationId ?
                          <>
                            <p><strong>Check In:</strong> <input type="date" defaultValue={reservation.checkIn.split("T")[0]}  placeholder={reservation.checkIn.split("T")[0]} onChange={(e) => setEditData({ ...editData, checkIn: e.target.value.split("T")[0] })} /></p>
                            <p><strong>Check Out:</strong> <input type="date" defaultValue={reservation.checkOut.split("T")[0]}  placeholder={reservation.checkOut.split("T")[0]} onChange={(e) => setEditData({ ...editData, checkOut: e.target.value.split("T")[0] })} /></p>
                          </>
                          :
                          <p><strong>Check In:</strong> {reservation.checkIn.split("T")[0]} | <strong>Check Out:</strong> {reservation.checkOut.split("T")[0]}</p>
                        }
                      </div>
                      <div className="btn-container">
                        {editMode && editId === reservation.reservationId ?
                          <>
                            <button className="btn" onClick={() => editReservation(reservation)}>Save</button>
                            <button className="btn" onClick={() => toggleEditMode(null)}>Cancel</button>
                          </>
                          :
                          <>
                            <button className="btn" onClick={() => toggleEditMode(reservation.reservationId)}>Edit</button>
                            <button className="btn" onClick={() => deleteReservation(reservation.reservationId)}>Delete</button>
                          </>
                        }
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