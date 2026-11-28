import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
    createHotel as createHotelThunk,
    fetchHotelById,
    fetchHotels,
    setHotelCurrent,
    updateHotel as updateHotelThunk
} from "../../store/hotelSlice.js";
import ImageInput from "./ImageInput.jsx";

export default function HotelForms() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [adress, setAdress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [image, setImage] = useState(null);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {hotelCurrent, status, error} = useSelector((state) => state.hotels);

    const previousPage = "/admin/dashboard";
    const hotelIdParam = searchParams.get("hotelId");
    const parsedHotelId = hotelIdParam === null ? null : Number(hotelIdParam);
    const hotelId = Number.isInteger(parsedHotelId) && parsedHotelId > 0 ? parsedHotelId : null;

    useEffect(() => {
        if (hotelId !== null) {
            dispatch(fetchHotelById(hotelId));
        } else {
            dispatch(setHotelCurrent({}));
        }
    }, [dispatch, hotelId])

    useEffect(() => {
        setName(hotelCurrent.name ?? "");
        setEmail(hotelCurrent.email ?? "");
        setPhone(hotelCurrent.phone ?? "");
        setAdress(hotelCurrent.adress ?? "");
        setCity(hotelCurrent.city ?? "");
        setCountry(hotelCurrent.country ?? "");
    }, [hotelCurrent])

    const submitHotel = async (e) => {
        e.preventDefault();
        let data = { name, email, phone, adress, city, country, img: image };
        if (hotelId !== null) {
            data.id = hotelId;
            await updateHotel(data);
        }
        else {
            await createHotel(data);
        }
    }

    const updateHotel = async (data) => {
        const action = await dispatch(updateHotelThunk(data));
        if (updateHotelThunk.fulfilled.match(action)) {
            await dispatch(fetchHotels());
            alert("Hotel was updated!");
            navigate(previousPage);
        }
    }

    const createHotel = async (data) => {
        const action = await dispatch(createHotelThunk(data));
        if (createHotelThunk.fulfilled.match(action)) {
            await dispatch(fetchHotels());
            alert("Hotel was created!");
            navigate(previousPage);
        }
    }
    return (
        <>
            <article>
                <header>
                    <h3>{hotelId === null ? "Create new hotel" : "Update hotel"}</h3>
                </header>
                <form onSubmit={submitHotel}>
                    <fieldset>
                        {status === "rejected" && error && <p role="alert">{error}</p>}
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
                                <button type="submit" className="btn btn--primary" disabled={status === "pending"}>
                                    {hotelId === null ? "Create" : "Save"}
                                </button>
                            </div>
                        </div>

                    </fieldset>
                </form>
            </article>
        </>
    )
}