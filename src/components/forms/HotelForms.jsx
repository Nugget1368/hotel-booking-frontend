import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../application/api.js"

export default function HotelForms() {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [hotelId, setHotelId] = useState(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const previousPage = "/admin/dashboard";

    useEffect(() => {
        const hotelIdParam = searchParams.get("hotelId");
        if (hotelIdParam !== null) {
            setHotelId(Number(hotelIdParam));
        }
        if (Number.isInteger(hotelId) && hotelId > 0) {
            fetchHotel(hotelId);
        }
    }, [])

    const fetchHotel = async (hotelId) => {
        let response = await api.getHotelByIdAsync(hotelId);
        if (response) {
            setName(response.name);
            setAddress(response.address);
            setCity(response.city);
            setCountry(response.country);
        }
    }

    const submitHotel = async (e) => {
        e.preventDefault();
        let data = { name, address, city, country };
        if(hotelId !== null) {
            data.id = hotelId;
            updateHotel(data);
        }
        else {
            createHotel(data);
        }
    }

    const updateHotel = async (data) => {
        let response = await api.updateHotelAsync(data);
        if (response.success) {
            alert("Hotel was updated!");
            navigate(previousPage);
        }
        else {
            alert("Hotel was not updated!");
        }
    }

    const createHotel = async (data) => {
        let response = await api.createHotelAsync(data);
        if (response.success) {
            alert("Hotel was created!");
            navigate(previousPage);
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
                <form onSubmit={submitHotel}>
                    <fieldset>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                        <button type="button" onClick={() => navigate(previousPage)}>Cancel</button>
                        <button type="submit">Create</button>
                    </fieldset>
                </form>
            </article>
        </>
    )
}