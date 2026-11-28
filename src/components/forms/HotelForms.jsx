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
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        adress: "",
        city: "",
        country: "",
        img: null
    });

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
        setFormData((data) => ({
            ...data,
            name: hotelCurrent.name ?? "",
            email: hotelCurrent.email ?? "",
            phone: hotelCurrent.phone ?? "",
            adress: hotelCurrent.adress ?? "",
            city: hotelCurrent.city ?? "",
            country: hotelCurrent.country ?? "",
            img: null
        }));
    }, [hotelCurrent])

    const submitHotel = async (e) => {
        e.preventDefault();
        let data = { ...formData };
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
                                <input type="text" name="name" id="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData((data) => ({ ...data, name: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" id="phone" placeholder="Phone" value={formData.phone} onChange={(e) => setFormData((data) => ({ ...data, phone: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData((data) => ({ ...data, email: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="adress">Address</label>
                                <input type="text" name="adress" id="adress" placeholder="Adress" value={formData.adress} onChange={(e) => setFormData((data) => ({ ...data, adress: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" id="city" placeholder="City" value={formData.city} onChange={(e) => setFormData((data) => ({ ...data, city: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <label htmlFor="country">Country</label>
                                <input type="text" name="country" id="country" placeholder="Country" value={formData.country} onChange={(e) => setFormData((data) => ({ ...data, country: e.target.value }))} />
                            </div>
                            <div className="form-fields__field">
                                <ImageInput
                                    image={formData.img}
                                    setImage={(img) => setFormData((data) => ({ ...data, img }))}
                                />
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