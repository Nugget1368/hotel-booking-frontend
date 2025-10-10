import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../../application/api.js"

export default function BookingForms() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [roomType, setRoomType] = useState("single");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");

    const navigate = useNavigate();

    const reservation = async (e) => {
        e.preventDefault();
        let data = { firstName, lastName, email, phone, roomType, checkIn, checkOut };
        let response = await api.makeReservationAsync(data);
        if (response) {
            alert("Reservation was made!");
            navigate("/");
        }
        else{
            alert("Reservation was not made!");
            console.log(response);
        }
    }

    return (
        <>
                <article>
                    <form onSubmit={reservation}>
                        <fieldset>
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" name="firstName" id="firstName" required autoFocus value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                </div>
                                <div className="column">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                </div>
                            </div>
                            <div className="column">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="column">
                                <label htmlFor="phone">Phone</label>
                                <input type="tel" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="column">
                                <label htmlFor="roomType">Room Type</label>
                                <select name="roomType" id="roomType" value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                                    <option value="single">Single</option>
                                    <option value="double">Double</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="column">
                                    <label htmlFor="checkIn">Check In</label>
                                    <input type="date" name="checkIn" id="checkIn" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
                                </div>
                                <div className="column">
                                    <label htmlFor="checkOut">Check Out</label>
                                    <input type="date" name="checkOut" id="checkOut" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                        </fieldset>
                    </form>
                </article>
        </>
    );
}