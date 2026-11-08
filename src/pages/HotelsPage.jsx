import { Link } from "react-router";
import { MySessionStorage } from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import { useEffect, useState } from "react"
import api from "../application/api"
import HotelArticle from "../components/HotelArticle"
import './_page.scss'
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
        console.log("result: ", result);
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
                        <HotelArticle
                            key={`hotel-${hotel.hotelId || index}`}
                            hotel={hotel}
                        >
                            <Link className="btn primary" to={`/booking?hotelId=${hotel.id}`}>Book This</Link>
                        </HotelArticle>
                    ))
                }
            </section>
        </>
    )
}

export default HotelsPage