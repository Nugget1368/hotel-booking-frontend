import {useEffect, useState} from "react"
import Api from "../application/api"
import UserDataItem from "../components/users/UserDataItem"
import Slider from "../components/Slider"
import HotelForms from "../components/forms/HotelForms"
import HotelArticle from "../components/HotelArticle"
import HotelList from "../components/HotelList"
import ReservationItem from "../components/reservations/ReservationItem"
import {useSelector, useDispatch} from "react-redux";
import {fetchGuests} from "../store/guestSlice.js";
import {fetchHotels} from "../store/hotelSlice.js";
import {fetchReservationsAll} from "../store/reservationSlice.js";

const AdminPage = () => {

    const {guestAll, status, error} = useSelector((state) => state.guests);
    const {hotels} = useSelector((state) => state.hotels);
    const {reservations} = useSelector((state) => state.reservations);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGuests());
        dispatch(fetchHotels());
        dispatch(fetchReservationsAll())
    }, [dispatch])


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
                            <HotelForms/>
                        </div>
                    </Slider>
                    <section>
                        <button onClick={() => dispatch(fetchHotels())} className="btn btn--primary">Refresh</button>
                    </section>
                    <HotelList>
                        {hotels && hotels.length > 0 ?
                            hotels.map((hotel, index) => {
                                return (
                                    <HotelArticle
                                        key={`hotel-${hotel.hotelId || index}`}
                                        hotel={hotel}
                                        showDetails
                                    >
                                        <button className="btn btn--warning">Edit</button>
                                        <button className="btn btn--danger">Delete</button>
                                    </HotelArticle>
                                )
                            })
                            :
                            <p>No hotels found.</p>
                        }
                    </HotelList>
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
                        {status === "pending" && <li><p>Loading users...</p></li>}
                        {status === "rejected" && <li><p role="alert">{error}</p></li>}
                        {status !== "pending" && guestAll && guestAll.length > 0 ?
                            guestAll.map((guest) => {
                                return (
                                    <UserDataItem
                                        key={guest.guestId}
                                        user={guest}/>
                                )
                            })
                            : status !== "pending" && status !== "rejected" &&
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