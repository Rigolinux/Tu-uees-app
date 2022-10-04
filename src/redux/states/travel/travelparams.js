import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    id_document: "",
}

export const travelParamsSlice = createSlice({
    name: 'travelParams',
    initialState,
    reducers: {
        setTravelParams: (state, action) => {
            state.id_document = action.payload.id_document;
        }
    }
})

export const { setTravelParams } = travelParamsSlice.actions

export default travelParamsSlice.reducer
