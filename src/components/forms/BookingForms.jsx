import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../application/api.js"
import { MySessionStorage } from "../../application/localStorage.js"
import CreateAccountForm from "./CreateAccountForm.jsx"
import ReservationForm from "./ReservationForm.jsx"

export default function BookingForms() {
    const [loggedIn, setLoggedIn] = useState(false);

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
        if (MySessionStorage.getUserInfo()) {
            setLoggedIn(true);
            let user = MySessionStorage.getUserInfo();
            setFormData({...formData, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone});
        }
    }, [])

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
        loggedIn ? response = await api.createUserReservationAsync(MySessionStorage.getUserToken(), data) : response = await api.createGuestReservationAsync(data);
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
            <article>
                <header>
                    <h1>Make a reservation</h1>
                </header>
                <form onSubmit={CreateReservation}>
                    <fieldset>
                        {loggedIn ?
                            <div className="column">
                                <h3><strong>Logged in as:</strong> {firstName} {lastName}</h3>
                                <h4><strong>Email:</strong> {email}</h4>
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
            </article>
        </>
    );
}