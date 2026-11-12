import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import api from "../../application/api.js"
import ImageInput from "./ImageInput.jsx";

export default function HotelForms() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [hotelId, setHotelId] = useState(null);
    const [image, setImage] = useState(null);

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
            setEmail(response.email);
            setPhone(response.phone);
            setAdress(response.adress);
            setCity(response.city);
            setCountry(response.country);
        }
    }

    const submitHotel = async (e) => {
        e.preventDefault();
        let data = { name, email, phone, adress, city, country, img: image };
        if (hotelId !== null) {
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
                    <h3>Create new hotel</h3>
                </header>
                <form onSubmit={submitHotel}>
                    <fieldset>
                        <div className="form-fields">
                            <div className="form-fields__field">
                                <label htmlFor="name">Name</label>
                                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="email">Email</label>
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="adress">Address</label>
                                <input type="text" placeholder="Adress" value={adress} onChange={(e) => setAdress(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="city">City</label>
                                <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="country">Country</label>
                                <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
                            </div>
                            <div className="form-fields__field">
                                <ImageInput image={image} setImage={setImage} />
                            </div>
                            <div className="form-fields__actions form-actions">
                                <button type="button" className="btn btn--danger" onClick={() => navigate(previousPage)}>Cancel</button>
                                <button type="submit" className="btn btn--primary">Create</button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </article>
        </>
    )
}