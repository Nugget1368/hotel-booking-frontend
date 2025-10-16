import BookingForms from "../components/forms/BookingForms"
import { Link } from "react-router"
import Header from "../components/Header"
import { MySessionStorage } from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import { useEffect, useState } from "react"
import api from "../application/api"
const HotelsPage = () => {
    const [myReservations, setMyReservations] = useState([]);
    const getReservations = async () => {
        let result = await api.getUserReservationAsync(MySessionStorage.getUserToken());
        if (result) {
            setMyReservations(result);
        }
    }

    useEffect(() => {
        if (MySessionStorage.getUserToken()) {
            getReservations();
        }
    }, [])
    let hotels = [
        {
            "name": "Hotel 1",
            "address": "yomamas address",
            "city": "Stockholm",
            "country": "Sweden",
            "phone": "123456789",
            "email": "email@domain"
        },
        {
            "name": "Hotel 2",
            "address": "Coppenhagen 2",
            "city": "Coppenhagen",
            "country": "Denmark",
            "phone": "123456789",
            "email": "email@domain"
        },
        {
            "name": "Hotel 3",
            "address": "",
            "city": "Oslo",
            "country": "Norway",
            "phone": "123456789",
            "email": "email@domain"
        },
        {
            "name": "Hotel 3",
            "address": "",
            "city": "Oslo",
            "country": "Norway",
            "phone": "123456789",
            "email": "email@domain"
        }
    ]

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
                            <Link to="/booking">Book This</Link>
                        </article>
                    ))
                }
            </section>
        </>
    )
}

export default HotelsPage