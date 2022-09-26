import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,

}

export const originSlice = createSlice({
    name: 'origin',
    initialState,
    reducers: {
        setOrigin: (state, action) => {
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
            state.latitudeDelta = action.payload.latitudeDelta;
            state.longitudeDelta = action.payload.longitudeDelta;
        },
        getOrigin: (state) => {
            return state;
        },
        cleanOrigin: (state) => {
            state.latitude = 0;
            state.longitude = 0;
            state.latitudeDelta = 0;
            state.longitudeDelta = 0;
        }
    },
})

export const { setOrigin,getOrigin,cleanOrigin } = originSlice.actions

export default originSlice.reducer


