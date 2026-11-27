import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";

const initialState = {
    reservations: [],
    reservationCurrent: {},
    status: "idle",
    error: null,
}

export const reservationSlice = createSlice({
    name: "reservationSlice",
    initialState,
    reducers: {
        //Actions
        setReservations: (state, action) => {
            state.reservations = action.payload
        },
        setReservationCurrent: (state, action) => {
            state.reservationCurrent = action.payload
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserReservations.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(fetchUserReservations.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.reservations = action.payload
            })
            .addCase(fetchUserReservations.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message;
            })
            .addCase(fetchReservationsAll.pending, (state, action) => {
                state.status = "pending"
            })
            .addCase(fetchReservationsAll.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.reservations = action.payload
            })
            .addCase(fetchReservationsAll.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message;
            })
    }
})

export const fetchUserReservations = createAsyncThunk("reservations/fetchUserReservations", async (token) => {
    let result = await api.getUserReservationAsync(token);
    return result;
})

export const fetchReservationsAll = createAsyncThunk("reservations/fetchReservationsAll", async (token) => {
    let result = await api.getReservationsAsync(token);
    return result;
})

export const {setReservations, setReservationCurrent} = reservationSlice.actions;
export default reservationSlice.reducer