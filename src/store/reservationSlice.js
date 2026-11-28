import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";
import {logoutGuest} from "./guestSlice.js";

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
        updateReservation: (state, action) => {
            const index = state.reservations.findIndex(
                (reservation) => reservation.reservationId === action.payload.reservationId
            );
            if (index !== -1) {
                state.reservations[index] = action.payload;
            }
        },
        removeReservation: (state, action) => {
            state.reservations = state.reservations.filter(
                (reservation) => reservation.reservationId !== action.payload
            );
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserReservations.pending, (state, action) => {
            state.status = "pending"
            state.reservations = [];
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
            .addCase(logoutGuest, (state) => {
                state.reservations = [];
                state.reservationCurrent = {};
            })
    }
})

export const fetchUserReservations = createAsyncThunk("reservations/fetchUserReservations", async (_, {getState}) => {
    let result = await api.getUserReservationAsync(getState().guests.guestCurrent.token);
    return result;
})

export const fetchReservationsAll = createAsyncThunk("reservations/fetchReservationsAll", async (_, {getState}) => {
    let result = await api.getReservationsAsync(getState().guests.guestCurrent.token);
    return result;
})

export const {
    setReservations,
    setReservationCurrent,
    updateReservation,
    removeReservation,
} = reservationSlice.actions;
export default reservationSlice.reducer