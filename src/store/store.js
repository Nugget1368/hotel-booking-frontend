import {configureStore} from "@reduxjs/toolkit";
import hotelReducer from './hotelSlice.js';
import reservationReducer from './reservationSlice.js';

export const store = configureStore({
    reducer: {
        hotels: hotelReducer,
        reservations: reservationReducer,
    },
})