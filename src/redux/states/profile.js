import { createSlice } from "@reduxjs/toolkit";


//db referencias
import { db } from '../../../backend/firebase'
import { collection, doc, getDocs, where,query } from 'firebase/firestore'


const initialState = {
  //valores futuros para la pagina de perfil
  correo:"",
  id_user:"",
  travel:false,
  type_user:"",
};


export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
       getProfile: (state, action) => {
        state.correo = action.payload.correo;
        state.id_user = action.payload.id_user;
        state.travel = action.payload.travel;
        state.type_user = action.payload.type_user;
       },
       starTrip: (state, action) => {
        state.travel = true;
        }
       ,
        endTrip: (state, action) => {
        state.travel = false;
        },

       cleanProfile: (state) => {
        state.correo = "";
        state.id_user = "";
        state.travel = false;
        state.type_user = "";
       },
        //acciones futuras para la pagina de perfil
    },
});

export const {getProfile,cleanProfile,starTrip,endTrip} = profileSlice.actions;

export default profileSlice.reducer;

