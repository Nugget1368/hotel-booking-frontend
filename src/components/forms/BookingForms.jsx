import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../application/api.js"
import { MySessionStorage } from "../../application/localStorage.js"
import CreateAccountForm from "./CreateAccountForm.jsx"
import ReservationForm from "./ReservationForm.jsx"

export default function BookingForms() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roomType, setRoomType] = useState("single");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (MySessionStorage.getUserInfo()) {
            setLoggedIn(true);
            let user = MySessionStorage.getUserInfo();
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setEmail(user.email);
            setPhone(user.phone);
        }
    }, [])

    const CreateReservation = async (e) => {
        e.preventDefault();
        const hotelIdParam = searchParams.get("hotelId");
        const hotelId = hotelIdParam === null ? null : Number(hotelIdParam);
        let data = {
            firstName,
            lastName,
            email,
            phone,
            roomType,
            checkIn,
            checkOut,
            ...(Number.isInteger(hotelId) && hotelId > 0 ? { hotelId } : {})
        };
        ///TODO: Move this to backend
        Object.keys(data).forEach(key => data[key] === "" ? data[key] = null : data[key]);
        let response;
        console.log("data", data);
        // loggedIn ? response = await api.createUserReservationAsync(MySessionStorage.getUserToken(), data) : response = await api.createGuestReservationAsync(data);
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
                                data={{
                                    firstName,
                                    setFirstName,
                                    lastName,
                                    setLastName,
                                    email,
                                    setEmail,
                                    phone,
                                    setPhone
                                }}
                            />
                        }
                        <ReservationForm
                            data={{
                                roomType,
                                setRoomType,
                                checkIn,
                                setCheckIn,
                                checkOut,
                                setCheckOut
                            }}
                        />
                    </fieldset>
                </form>
            </article>
        </>
    );
}