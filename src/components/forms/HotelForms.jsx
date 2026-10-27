import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../application/api.js"

export default function HotelForms() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const hotelIdParam = searchParams.get("hotelId");
        const hotelId = hotelIdParam === null ? null : Number(hotelIdParam);
        if (Number.isInteger(hotelId) && hotelId > 0) {
            fetchHotel(hotelId);
        }
    }, [searchParams])

    const fetchHotel = async (hotelId) => {
        let response = await api.getHotelByIdAsync(hotelId);
        if (response) {
            setName(response.name);
            setAddress(response.address);
            setCity(response.city);
            setCountry(response.country);
        }
    }

    const createHotel = async (e) => {
        e.preventDefault();
        let data = { name, address, city, country };
        let response = await api.createHotelAsync(data);
        if (response.success) {
            alert("Hotel was created!");
            navigate("/hotels");
        }
        else {
            alert("Hotel was not created!");
        }
    }
    return (
        <>
            <article>
                <header>
                    <h1>Create new hotel</h1>
                </header>
                <form onSubmit={createHotel}>
                    <fieldset>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <button type="submit">Create</button>
                    </fieldset>
                </form>
            </article>
        </>
    )
}