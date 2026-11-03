import { useEffect, useState } from "react"
import Api from "../application/api"
import Card from "../components/Card"
import Slider from "../components/Slider"
import HotelForms from "../components/forms/HotelForms"

const AdminPage = () => {

  const [reservations, setReservations] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    roomType: "",
    checkIn: "",
    checkOut: ""
  });
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);

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

  const getAllUSers = async () => {
    let result = await Api.getAllGuestsAsync();
    setUsers(result);
  }

  const deleteUser = async (id) => {
    let result = await Api.deleteUserAsync(id);
    if (result.success) {
      let newList = users.filter((user) => user.guestId !== id);
      setUsers(newList);
      getReservations();
    }
    else {
      alert("Could not delete user.");
    }
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
        editData[key] = reservation[key];
    })
    let id = reservation.reservationId;
    let result = await Api.editReservationAsync(id, editData);
    if (result.success) {
      let newList = reservations.map((r) => r.reservationId === id ? result.reservation : r);
      setReservations(newList);
      toggleEditMode(null);
    }
    else {
      alert("Could not edit reservation.");
    }
  }

  const getAllHotels = async () => {
    let result = await Api.getHotelsAsync();
    console.log(result);
    setHotels(result);
  }

  useEffect(() => {
    getReservations();
    getAllUSers();
    getAllHotels();
  }, [])

  return (
    <>
      <header>
        <h1>AdminPage</h1>
      </header>
      <section>
        <article>
          <header className="row">
            <h2>Hotels</h2>
          </header>
            <Slider label="Add new hotel" defaultOpen={false}>
              <HotelForms />
            </Slider>
          <section className="btn-container">
            <button onClick={getAllHotels}>Refresh</button>
          </section>
          <ul>
            {hotels && hotels.length > 0 ?
              hotels.map((hotel, index) => {
                return (
                  <Card as="li" key={`hotel-${hotel.hotelId ? hotel.hotelId : index}`} className="row">
                    {hotel.img && hotel.img !== "" ?
                      <div className="column">
                        <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                      </div>
                      :
                      <div className="column">
                        <img src="https://via.placeholder.com/150" alt={hotel.name} />
                      </div>
                    }
                    <div className="column align-self-start">
                      <header>
                        <h3>{hotel.name}</h3>
                      </header>
                      <section className="column">
                        <p><strong>Location:</strong> {hotel.city}, {hotel.country}</p>
                      </section>
                      <section className="column">
                        <h4>Contacts</h4>
                        <p><strong>Email:</strong> {hotel.email}</p>
                        <p><strong>Phone:</strong> {hotel.phone}</p>
                      </section>
                    </div>
                    <section className="btn-container align-self-end">
                      <button className="btn">Edit</button>
                      <button className="btn">Delete</button>
                    </section>
                  </Card>
                )
              })
              :
              <li>
                <p>No hotels found.</p>
              </li>
            }
          </ul>
        </article>
      </section>
      <section>
        <article>
          <header>
            <h2>Reservations</h2>
          </header>
          <ul>
            {reservations && reservations.length > 0 ?
              reservations.map((reservation) => {
                return (
                  <Card as="li" key={reservation.reservationId}>
                    <div className="row">
                      <div className="column">
                        <h3>{reservation.firstName} {reservation.lastName}</h3>
                        {editMode && editId === reservation.reservationId ?
                          <p><strong>Room Type:</strong> <input type="text" placeholder={reservation.roomType} defaultValue={reservation.roomType} onChange={(e) => setEditData({ ...editData, roomType: e.target.value })} /></p>
                          :
                          <p><strong>Room Type:</strong> {reservation.roomType}</p>
                        }
                        {editMode && editId === reservation.reservationId ?
                          <>
                            <p><strong>Check In:</strong> <input type="date" defaultValue={reservation.checkIn} placeholder={reservation.checkIn} onChange={(e) => setEditData({ ...editData, checkIn: e.target.value })} /></p>
                            <p><strong>Check Out:</strong> <input type="date" defaultValue={reservation.checkOut} placeholder={reservation.checkOut} onChange={(e) => setEditData({ ...editData, checkOut: e.target.value })} /></p>
                          </>
                          :
                          <p><strong>Check In:</strong> {reservation.checkIn} | <strong>Check Out:</strong> {reservation.checkOut}</p>
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
                  </Card>
                )
              })
              :
              <li>
                <p>There are no reservations</p>
              </li>
            }
          </ul>
        </article>
        <article>
          <header>
            <h2>Users</h2>
          </header>
          <ul>
            {users && users.length > 0 ?
              users.map((user) => {
                return (
                  <Card as="li" key={user.guestId}>
                    <div className="row">
                      <div className="column">
                        <h3>{user.firstName} {user.lastName}</h3>
                        <p><strong>Email:</strong> {user.email}</p>
                      </div>
                      <div className="btn-container">
                        <button className="btn" onClick={() => deleteUser(user.guestId)}>Delete</button>
                      </div>
                    </div>
                  </Card>
                )
              })
              :
              <li>
                <p>There are no users</p>
              </li>
            }
          </ul>
        </article>
      </section>
    </>
  )
}

export default AdminPage