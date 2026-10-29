import BookingForms from "../components/forms/BookingForms"
import { Link } from "react-router"
import { MySessionStorage } from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import { useEffect, useState } from "react"
import api from "../application/api"
import Card from "../components/Card"
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
        if (hotels === undefined || hotels.length === 0) {
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
            <section className="card-list">
                {
                    hotels.map((hotel, index) => (
                        <Card as="article" key={`hotel-${hotel.hotelId || index}`} className="card">
                            <div className="column" style={{ width: "100%" }}>
                                {hotel.img && hotel.img !== "" ?
                                    <img src={`data:${hotel.imgType};base64,${hotel.img}`} alt={hotel.name} />
                                    :
                                    <img src="https://via.placeholder.com/150" alt={hotel.name} />}
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
                        </Card>
                    ))
                }
            </section>
        </>
    )
}

export default HotelsPage