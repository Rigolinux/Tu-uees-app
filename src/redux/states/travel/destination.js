
import { createSlice } from "@reduxjs/toolkit";


// databaase
import {db} from '../../../../backend/firebase'
import { doc, getDocs,collection } from "firebase/firestore";
const database = collection(db,'xx');


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
        cleanDestination: (state) => {
            state.latitude = 0;
            state.longitude = 0;
            state.latitudeDelta = 0;
            state.longitudeDelta = 0;
        },
        getDestinationFromDatabase: (state) => {
            newP = getCurrentPosition();
            state.latitude = newP.latitude;
            state.longitude = newP.longitude;
            state.latitudeDelta = 0.0922,
            state.longitudeDelta = 0.0421
        }
    },
});

export const { setDestination,getDestination,getDestinationFromDatabase } = destinationSlice.actions

export default destinationSlice.reducer