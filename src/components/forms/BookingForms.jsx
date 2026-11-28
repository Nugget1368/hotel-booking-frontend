import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import api from "../../application/api.js"
import CreateAccountForm from "./CreateAccountForm.jsx"
import ReservationForm from "./ReservationForm.jsx"
import HotelArticle from "../HotelArticle.jsx";


export default function BookingForms() {
    const guestCurrent = useSelector((state) => state.guests.guestCurrent);
    const loggedIn = Boolean(guestCurrent.token);
    const [hotel, setHotel] = useState({});
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
        async function getHotel(){
            let h = await api.getHotelByIdAsync(Number(searchParams.get("hotelId")));
            if(h !== null){
                setHotel(h);
            }
        }
        getHotel();
    }, [searchParams])

    const CreateReservation = async (e) => {
        e.preventDefault();
        const hotelIdParam = searchParams.get("hotelId");
        const hotelId = hotelIdParam === null ? null : Number(hotelIdParam);
        let data = {
            ...formData,
            ...(Number.isInteger(hotelId) && hotelId > 0 ? { hotelId } : {})
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
                </div>
            </article>
        </>
    );
}