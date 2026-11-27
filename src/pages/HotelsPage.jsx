import {Link} from "react-router";
import {MySessionStorage as mySessionStorage, MySessionStorage} from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import {useEffect, useState} from "react"
import HotelArticle from "../components/HotelArticle"
import HotelList from "../components/HotelList"
import {useSelector, useDispatch} from "react-redux";
import {fetchHotels} from "../store/hotelSlice.js";
import {fetchReservations} from "../store/reservationSlice.js";

const HotelsPage = () => {
    const {hotels, hotelCurrent, status, error} = useSelector((state) => state.hotels);
    const {reservations} = useSelector((state) => state.reservations);
    let dispatch = useDispatch();

    useEffect(() => {
        if (MySessionStorage.getUserToken()) {
            dispatch(fetchReservations(mySessionStorage.getUserToken()));
        }
        if (hotels.length <= 0) {
            dispatch(fetchHotels());
        }
    }, [])

    return (
        <>
            {reservations && reservations.length > 0 &&
                <div className="my-reservations">
                    <h2>My Reservations</h2>
                    <ReservationsList reservations={reservations}/>
                </div>
            }
            <HotelList>
                {status === "pending" ? <div><p>Loading...</p></div> :
                    status === "error" ? <div>An error has occurred</div> :
                        hotels && hotels.map((hotel, index) => (
                            <HotelArticle
                                key={`hotel-${hotel.hotelId || index}`}
                                hotel={hotel}
                            >
                                <Link className="btn btn--primary" to={`/booking?hotelId=${hotel.id}`}>Book
                                    This</Link>
                            </HotelArticle>
                        ))
                }
            </HotelList>
        </>
    )
}

export default HotelsPage