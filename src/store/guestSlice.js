import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";
import {MySessionStorage} from "../application/localStorage.js";

const initialState = {
    guestCurrent: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        token: ""
    },
    guestAll: [],
    guestRole: "",
    status: "idle",
    error: null,
}

export const fetchGuests = createAsyncThunk("guests/fetchGuests", async () => {
    return await api.getAllGuestsAsync(MySessionStorage.getUserToken());
})

export const deleteGuest = createAsyncThunk("guests/deleteGuest", async (id, {rejectWithValue}) => {
    const result = await api.deleteUserAsync(id, MySessionStorage.getUserToken());
    return {id, result};
})

export const createGuest = createAsyncThunk("guests/createGuest", async (guest, {rejectWithValue}) => {
    const result = await api.createAccountAsync(guest);
    return result;
})

export const loginGuest = createAsyncThunk("guests/loginGuest", async (guest, {rejectWithValue}) => {
    const result = await api.loginUserAsync(guest);
    return result;
})

export const getGuestRole = createAsyncThunk("guests/getGuestRole", async (token) => {
    return await api.getUserRoleAsync(token ?? MySessionStorage.getUserToken());
})

export const guestSlice = createSlice({
    name: "guestSlice",
    initialState,
    reducers: {
        //Actions
        setGuestCurrent: (state, action) => {
            state.guestCurrent = action.payload;
        },
        setGuestAll: (state, action) => {
            state.guestAll = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchGuests.pending, (state) => {
            state.status = "pending";
            state.error = null;
        })
            .addCase(fetchGuests.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.guestAll = action.payload;
            })
            .addCase(fetchGuests.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
            .addCase(deleteGuest.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(deleteGuest.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.guestAll = state.guestAll.filter((guest) => guest.guestId !== action.payload.id);
            })
            .addCase(deleteGuest.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(createGuest.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(createGuest.fulfilled, (state) => {
                state.status = "fulfilled";
            })
            .addCase(createGuest.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(loginGuest.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(loginGuest.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.guestCurrent = {
                    ...state.guestCurrent,
                    ...action.payload.rows,
                    token: action.payload.rows?.token || "",
                };
            })
            .addCase(loginGuest.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.payload || action.error.message;
            })
            .addCase(getGuestRole.pending, (state) => {
                state.status = "pending";
                state.error = null;
            })
            .addCase(getGuestRole.fulfilled, (state, action) => {
                state.status = "fulfilled";
                state.guestRole = action.payload.role;
            })
            .addCase(getGuestRole.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message;
            })
    }
})

export const {setGuestCurrent, setGuestAll} = guestSlice.actions;
export default guestSlice.reducer