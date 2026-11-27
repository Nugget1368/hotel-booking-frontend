import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";

const initialState = {
    hotels: [],
    ratingId: 0,
    hotelCurrent: {},
    status: "idle",
    error: null,
}

export const hotelSlice = createSlice({
    name: "hotelSlice",
    initialState,
    reducers: {
        //Actions
        setHotels: (state, action) => {
            state.hotels = action.payload
        },
        setRatingId: (state, action) => {
            state.ratingId = action.payload
        },
        setHotelCurrent: (state, action) => {
            state.hotelCurrent = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchHotels.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.hotels = action.payload
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message;
            })
    }
})

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async () => {
    let result = await api.getHotelsAsync();
    console.log(result);
    return result;
})

export const {setHotels, setRatingId, setHotelCurrent} = hotelSlice.actions;
export default hotelSlice.reducer