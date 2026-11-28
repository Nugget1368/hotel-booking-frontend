import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";

export const fetchHotels = createAsyncThunk("hotels/fetchHotels", async (_, {rejectWithValue}) => {
    const result = await api.getHotelsAsync();
    if (!Array.isArray(result)) {
        return rejectWithValue("Hotels could not be loaded.");
    }
    return result;
})

export const fetchHotelById = createAsyncThunk("hotels/fetchHotelById", async (hotelId, {rejectWithValue}) => {
    const result = await api.getHotelByIdAsync(hotelId);
    if (!result) {
        return rejectWithValue("Hotel could not be loaded.");
    }
    return result;
})

export const createHotel = createAsyncThunk("hotels/createHotel", async (hotel, {getState, rejectWithValue}) => {
    const token = getState().guests.guestCurrent.token;
    const result = await api.createHotelAsync(hotel, token);
    if (!result?.success) {
        return rejectWithValue(result?.message || "Hotel could not be created.");
    }
    return result;
})

export const updateHotel = createAsyncThunk("hotels/updateHotel", async (hotel, {getState, rejectWithValue}) => {
    const token = getState().guests.guestCurrent.token;
    const result = await api.updateHotelAsync(hotel, token);
    if (!result?.success) {
        return rejectWithValue(result?.message || "Hotel could not be updated.");
    }
    return result;
})

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
        builder.addCase(fetchHotels.pending, (state) => {
            state.status = "pending";
            state.error = null;
        })
            .addCase(fetchHotels.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.hotels = action.payload;
            })
            .addCase(fetchHotels.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(fetchHotelById.pending, (state) => {
                state.status = "pending";
                state.error = null;
                state.hotelCurrent = {};
            })
            .addCase(fetchHotelById.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.hotelCurrent = action.payload;
            })
            .addCase(fetchHotelById.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(createHotel.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(createHotel.fulfilled, (state) => {
                state.status = "fulfilled";
            })
            .addCase(createHotel.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(updateHotel.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(updateHotel.fulfilled, (state) => {
                state.status = "fulfilled";
            })
            .addCase(updateHotel.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
    }
})

export const {setHotels, setRatingId, setHotelCurrent} = hotelSlice.actions;
export default hotelSlice.reducer