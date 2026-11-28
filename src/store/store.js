import {configureStore} from "@reduxjs/toolkit";
import hotelReducer from './hotelSlice.js';
import reservationReducer from './reservationSlice.js';
import guestReducer from './guestSlice.js';

export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
        reservations: reservationReducer,
        guests: guestReducer,
    },
})