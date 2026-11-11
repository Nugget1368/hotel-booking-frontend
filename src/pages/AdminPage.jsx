import { useEffect, useState } from "react"
import Api from "../application/api"
import Card from "../components/Card"
import Slider from "../components/Slider"
import HotelForms from "../components/forms/HotelForms"
import HotelArticle from "../components/HotelArticle"
import { MySessionStorage } from "../application/localStorage"
import ReservationItem from "../components/reservations/ReservationItem"

const AdminPage = () => {

  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [userRole, setUserRole] = useState(null);

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


  const getAllHotels = async () => {
    let result = await Api.getHotelsAsync();
    console.log(result);
    setHotels(result);
  }

  useEffect(() => {
    getReservations();
    getAllUSers();
    getAllHotels();
    async function fetchUserRole() {
      const token = MySessionStorage.getUserToken();
      const response = await Api.getUserRoleAsync(token);
      setUserRole(response.role);
    }
    fetchUserRole();
  }, [])

  return (
    <>
      <header>
        <h2>AdminPage</h2>
      </header>
      <section>
        <article>
          <header className="row">
            <h3>Hotels</h3>
          </header>
          <Slider label="Add new hotel" defaultOpen={false}>
            <div className="border">
              <HotelForms />
            </div>
          </Slider>
          <section className="btn-container">
            <button onClick={getAllHotels} className="btn primary">Refresh</button>
          </section>
          <section className="card-list">
            {hotels && hotels.length > 0 ?
              hotels.map((hotel, index) => {
                return (
                  <HotelArticle
                    key={`hotel-${hotel.hotelId || index}`}
                    hotel={hotel}
                  >
                    <button className="btn warning">Edit</button>
                    <button className="btn danger">Delete</button>
                  </HotelArticle>
                )
              })
              :
              <p>No hotels found.</p>
            }
          </section>
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
                  <ReservationItem
                    key={reservation.reservationId}
                    reservation={reservation}
                    reservationList={reservations}
                    setReservationsList={setReservations}
                  />
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