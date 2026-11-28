import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import api from "../../application/api.js"
import CreateAccountForm from "./CreateAccountForm.jsx"
import ReservationForm from "./ReservationForm.jsx"
import HotelArticle from "../HotelArticle.jsx";
import { fetchHotelById, setHotelCurrent } from "../../store/hotelSlice.js";


export default function BookingForms() {
    const guestCurrent = useSelector((state) => state.guests.guestCurrent);
    const loggedIn = Boolean(guestCurrent.token);
    const {hotelCurrent: hotel, status, error} = useSelector((state) => state.hotels);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        roomType: "single",
        checkIn: "",
        checkOut: ""
    });

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const hotelIdParam = searchParams.get("hotelId");
    const parsedHotelId = hotelIdParam === null ? null : Number(hotelIdParam);
    const hotelId = Number.isInteger(parsedHotelId) && parsedHotelId > 0 ? parsedHotelId : null;

    useEffect(() => {
        if (loggedIn) {
            setFormData((data) => ({
                ...data,
                firstName: guestCurrent.firstName,
                lastName: guestCurrent.lastName,
                email: guestCurrent.email,
                phone: guestCurrent.phone
            }));
        } else {
            setFormData((data) => ({
                ...data,
                firstName: "",
                lastName: "",
                email: "",
                phone: ""
            }));
        }
    }, [loggedIn, guestCurrent.firstName, guestCurrent.lastName, guestCurrent.email, guestCurrent.phone]);

    useEffect(() => {
        if (hotelId !== null) {
            dispatch(fetchHotelById(hotelId));
        } else {
            dispatch(setHotelCurrent({}));
        }
    }, [dispatch, hotelId])

    const CreateReservation = async (e) => {
        e.preventDefault();
        let data = {
            ...formData,
            ...(hotelId !== null ? { hotelId } : {})
        };
        ///TODO: Move this to backend
        Object.keys(data).forEach(key => data[key] === "" ? data[key] = null : data[key]);
        let response;
        loggedIn ? response = await api.createUserReservationAsync(guestCurrent.token, data) : response = await api.createGuestReservationAsync(data);
        if (response.success) {
            alert("Reservation was made!");
            navigate("/");
        }
        else {
            alert("Reservation was not made!");
        }
    }

    return (
        <>
            <article className="booking-form">
                <header className="booking-form__header">
                    <h2>Make a reservation</h2>
                </header>
                <div className="booking-form__content">
                    <form onSubmit={CreateReservation}>
                        <fieldset>
                            {loggedIn ?
                                <div className="column">
                                    <h3>Logged in as: {formData.firstName} {formData.lastName}</h3>
                                    <h4>Email: {formData.email}</h4>
                                </div>
                                :
                                <CreateAccountForm
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            }
                            <ReservationForm
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </fieldset>
                    </form>
                    <HotelArticle showDetails hotel={hotel}/>
                    {status === "rejected" && error && <p role="alert">{error}</p>}
                </div>
            </article>
        </>
    );
}