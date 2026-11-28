import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import api from "../application/api.js";

const initialGuest = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    token: ""
};
const initialState = {
    guestCurrent: initialGuest,
    guestAll: [],
    guestRole: "",
    status: "idle",
    error: null,
}

export const fetchGuests = createAsyncThunk("guests/fetchGuests", async (_, {getState}) => {
    return await api.getAllGuestsAsync(getState().guests.guestCurrent.token);
})

export const deleteGuest = createAsyncThunk("guests/deleteGuest", async (id, {getState, rejectWithValue}) => {
    const result = await api.deleteUserAsync(id, getState().guests.guestCurrent.token);
    if (!result.success) {
        return rejectWithValue(result.message || "Guest could not be deleted.");
    }
    return {id, result};
})

export const createGuest = createAsyncThunk("guests/createGuest", async (guest, {rejectWithValue}) => {
    const result = await api.createAccountAsync(guest);
    if (!result.success) {
        return rejectWithValue(result.message || "Account was not created.");
    }
    return result;
})

export const loginGuest = createAsyncThunk("guests/loginGuest", async (guest, {rejectWithValue}) => {
    const result = await api.loginUserAsync(guest);
    if (!result.success || !result.rows?.token) {
        return rejectWithValue(result.message || "Login was not successful.");
    }
    return result;
})

export const getGuestRole = createAsyncThunk("guests/getGuestRole", async (token, {getState}) => {
    return await api.getUserRoleAsync(token ?? getState().guests.guestCurrent.token);
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
        },
        logoutGuest: (state) => {
            state.guestCurrent = {...initialGuest};
            state.guestAll = [];
            state.guestRole = "";
            state.status = "idle";
            state.error = null;
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
                    token: action.payload.rows.token,
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

export const {setGuestCurrent, setGuestAll, logoutGuest} = guestSlice.actions;
export default guestSlice.reducer