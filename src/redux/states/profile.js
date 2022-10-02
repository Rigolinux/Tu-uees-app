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
        console.log("state",state)

       },
        //acciones futuras para la pagina de perfil
    },
});

export const {getProfile} = profileSlice.actions;

export default profileSlice.reducer;

