import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    img: "",
    color : "",
    font : "",

}

export const CustomizationSlice = createSlice({
    name: 'Customization',
    initialState,
    reducers: {
        setCustomization: (state, action) => {
            state.img = action.payload.img;
            state.color = action.payload.color;
            state.font = action.payload.font;
        },
        cleanCustomization: (state) => {
            state.img = "";
            state.color = "";
            state.font = "";
        }
    },
});

export const { setCustomization } = CustomizationSlice.actions

export default CustomizationSlice.reducer