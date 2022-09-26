
import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,

}

export const destinationSlice = createSlice({
    name: 'destination',
    initialState,
    reducers: {
        setDestination: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.latitudeDelta = action.payload.latitudeDelta;
            state.longitudeDelta = action.payload.longitudeDelta;
        },
        getDestination: (state) => {
            return state;
        },
        cleanDestination: (state) => {
            state.latitude = 0;
            state.longitude = 0;
            state.latitudeDelta = 0;
            state.longitudeDelta = 0;
        }
    },
});

export const { setDestination,getDestination } = destinationSlice.actions

export default destinationSlice.reducer