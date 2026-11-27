import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";

const initialState = {
    guestCurrent: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        token: ""
    },
    guestAll: [],
    status: "idle",
    error: null,
}

export const guestSlice = createSlice({
    name: "guestSlice",
    initialState,
    reducers: {
        //Actions
        setGuestCurrent: (state, action) => {
            state.GuestCurrent = action.payload;
        },
        setGuestAll: (state, action) => {
            state.GuestAll = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGuests.pending, (state, action) => {
            state.status = "pending"
        })
            .addCase(fetchGuests.fulfilled, (state, action) => {
                state.status = "fulfilled"
                state.guestAll = action.payload
            })
            .addCase(fetchGuests.rejected, (state, action) => {
                state.status = "rejected"
                state.error = action.error.message;
            })
    }
})

export const fetchGuests = createAsyncThunk("guests/fetchGuests", async () => {
    console.log("fetchGuests called, token:", this.token)
    let result = await api.getAllGuestsAsync(this.token);
    console.log("result:", result);
    return result;
})

export const deleteGuest = createAsyncThunk("guests/deleteGuest", async (id) => {
    console.log("fetchGuests called, token:", this.token)
    let result = await api.deleteUserAsync(id, this.token);
    console.log("result:", result);
    return result;
})

export const createGuest = createAsyncThunk("guests/createGuest", async (guest) => {
    console.log("fetchGuests called, token:", this.token)
    let result = await api.createAccountAsync(guest);
    console.log("result:", result);
    return result;
})

export const loginGuest = createAsyncThunk("guests/loginGuest", async (guest) => {
    console.log("fetchGuests called, token:", this.token)
    let result = await api.loginUserAsync(guest);
    console.log("result:", result);
    return result;
})

export const getGuestRole = createAsyncThunk("guests/getGuestRole", async () => {
    console.log("fetchGuests called, token:", this.token)
    let result = await api.getUserRoleAsync(this.token);
    console.log("result:", result);
    return result;
})

export const {setGuestCurrent, setGuestAll} = guestSlice.actions;
export default guestSlice.reducer