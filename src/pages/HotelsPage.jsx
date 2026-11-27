import {Link} from "react-router";
import {MySessionStorage} from "../application/localStorage"
import ReservationsList from "../components/reservations/ReservationsList"
import {useEffect, useState} from "react"
import api from "../application/api"
import HotelArticle from "../components/HotelArticle"
import HotelList from "../components/HotelList"
import {useSelector, useDispatch} from "react-redux";
import {setHotels, setHotelCurrent, fetchHotels} from "../store/hotelSlice.js";

const HotelsPage = () => {
    const [myReservations, setMyReservations] = useState([]);
    // const [hotels, setHotels] = useState([]);
    const {hotels, hotelCurrent, status, error} = useSelector((state) => state.hotels);
    let dispatch = useDispatch();

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
        if (hotels.length <= 0) {
            dispatch(fetchHotels());
        }
    }, [])

    return (
        <>
            {myReservations && myReservations.length > 0 &&
                <div className="my-reservations">
                    <h2>My Reservations</h2>
                    <ReservationsList reservations={myReservations}/>
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