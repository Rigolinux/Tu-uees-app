import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id_travel: "",
    type_trip: "",
}

export const travelSlice = createSlice({
    name: "travel",
    initialState,
    reducers: {
        setdataTravel: (state, action) => {
            state.id_travel = action.payload.id_travel;
            state.type_trip = action.payload.type_trip;

        },
        cleandtaTravel: (state) => {
            state.id_travel = "";
            state.type_trip = "";
        },
    },
});

export const {setdataTravel,cleandtaTravel } = travelSlice.actions;

export default travelSlice.reducer;
