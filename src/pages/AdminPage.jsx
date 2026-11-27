import {useEffect, useState} from "react"
import Api from "../application/api"
import UserDataItem from "../components/users/UserDataItem"
import Slider from "../components/Slider"
import HotelForms from "../components/forms/HotelForms"
import HotelArticle from "../components/HotelArticle"
import HotelList from "../components/HotelList"
import {MySessionStorage} from "../application/localStorage"
import ReservationItem from "../components/reservations/ReservationItem"
import {useSelector, useDispatch} from "react-redux";
import {fetchGuests, deleteGuest} from "../store/guestSlice.js";

const AdminPage = () => {

    ///TODO: Remove this
    const [reservations, setReservations] = useState([]);
    // const [users, setUsers] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [userRole, setUserRole] = useState(null);
    /// Remove this

    const {guestAll} = useSelector((state) => state.guests);
    const dispatch = useDispatch();

    const getReservations = async () => {
        let result = await Api.getReservationsAsync();
        setReservations(result);
    }

    const getAllHotels = async () => {
        let result = await Api.getHotelsAsync();
        console.log(result);
        setHotels(result);
    }

    const handleUserDeleted = () => {
        getReservations();
    };

    useEffect(() => {
        dispatch(fetchGuests());
        // getReservations();
        // getAllHotels();

        // async function fetchUserRole() {
        //     const token = MySessionStorage.getUserToken();
        //     const response = await Api.getUserRoleAsync(token);
        //     setUserRole(response.role);
        // }
        //
        // fetchUserRole();
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
                            <HotelForms/>
                        </div>
                    </Slider>
                    <section>
                        <button onClick={getAllHotels} className="btn btn--primary">Refresh</button>
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
                        {guestAll && guestAll.length > 0 ?
                            guestAll.map((guest) => {
                                return (
                                    <UserDataItem
                                        key={user.guestId}
                                        user={user}
                                        userList={guest}
                                        onUserDeleted={handleUserDeleted}/>
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