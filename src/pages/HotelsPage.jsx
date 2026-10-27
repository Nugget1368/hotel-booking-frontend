import BookingForms from "../components/forms/BookingForms"
import { Link } from "react-router"
import Header from "../components/Header"
import { MySessionStorage } from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import { useEffect, useState } from "react"
import api from "../application/api"
const HotelsPage = () => {
    const [myReservations, setMyReservations] = useState([]);
    const [hotels, setHotels] = useState([]);
    const getReservations = async () => {
        let result = await api.getUserReservationAsync(MySessionStorage.getUserToken());
        if (result) {
            setMyReservations(result);
        }
    }

    const getHotels = async () => {
        let result = await api.getHotelsAsync();
        if (result) {
            setHotels(result);
        }
    }

    useEffect(() => {
        if (MySessionStorage.getUserToken()) {
            getReservations();
        }
        if(hotels === undefined || hotels.length === 0) {
            getHotels();
        }
    }, [])

    return (
        <>
            {myReservations && myReservations.length > 0 &&
                <>
                    <h2>My Reservations</h2>
                    <ReservationsList reservations={myReservations} />
                </>
            }
            <section>
                {
                    hotels.map((hotel, index) => (
                        <article key={index} className="card">
                            <div className="column" style={{ width: "100%" }}>
                                <img src="https://picsum.photos/200/300" alt="" />
                            </div>
                            <div className="column">
                                <h2>{hotel.name}</h2>
                                <p>Address: {hotel.address}</p>
                            </div>
                            <div className="row">
                                <p>{hotel.city}</p>
                                <p>{hotel.country}</p>
                            </div>
                            <div className="column">
                                <p>Phone: {hotel.phone}</p>
                                <p>Email: {hotel.email}</p>
                            </div>
                            <Link to={`/booking?hotelId=${hotel.id}`}>Book This</Link>
                        </article>
                    ))
                }
            </section>
        </>
    )
}

export default HotelsPage