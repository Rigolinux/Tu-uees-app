import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native'
import React from 'react'

//maps view
import MapView,{Marker} from 'react-native-maps'
import Constants from 'expo-constants'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location';

//api key
// import {APY_KEY_MAPS} from '@env'
import {APY_KEY_MAPS} from '@env'

//redux components
import { useSelector,useDispatch } from 'react-redux';
import {setOrigin} from '../../src/redux/states/travel/origin';

import { db } from "../../backend/firebase";
import {
  collection,
  doc,
  getDocs,
  where,
  orderBy,
  query,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

//navigation}
import { useNavigation } from "@react-navigation/native";

const NavigatorDriverScreen = (props) => {

  const btnFinalizarViaje = () => {
    Alert.alert(
      "Finalizar viaje",
      "¿Está seguro de finalizar el viaje?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "OK", onPress: () => finalizarViaje() }
        // { text: "OK", onPress: () => btnconfFinalizarViaje() }
      ],
      { cancelable: false }
    );
  }

  // const btnconfFinalizarViaje = () => {
  //   // Alert.alert("Finalizar viaje", "Se finalizó el viaje con exito");
  //   Alert.alert(
  //     "Finalizar viaje",
  //     "Se finalizó el viaje con exito",
  //     [
  //       { text: "OK", onPress: () => finalizarViaje() }
  //     ],
  //   );
  // }

  const finalizarViaje = async () => {

    const id_HorarioC = props.route.params.SDS_id_Horario;

    // Actualizando la coleccion Historial
    try{
      const historialRef = collection(db, "Historial");
      const histup = doc(historialRef, id_HorarioC);
      await updateDoc(histup, {
        finalizado: true,
        state:      false,
      });
      console.log("Se actualizo el documento en la coleccion de Historial con exito")
    } catch (error) {
      console.log("Error al actualizar en historial: ", error);
    }

    // Eliminando el viaje de la coleccion de en_Curso
    // try{
    //   const en_CursoRef = collection(db, "en_Curso");
    //   // const en_CursoDel = doc(en_CursoRef, id_HorarioC);
    //   const en_CursoDel = doc(en_CursoRef, "zJVnuRYwoNdzxdcoNwcEfbqvws53"); // <--- Aquí se debe cambiar el id del usuario por que va quemado
    //   await deleteDoc(en_CursoDel);
    //   console.log("Se elimino el documento en la coleccion de en_Curso con exito")
    // } catch (error) {
    //   console.log("Error al eliminar en en_Curso: ", error);
    // }

    // Actualizando datos de la coleccion de en_Curso
    try{
      const en_CursoRef = collection(db, "en_Curso");
      const en_CursoUp = doc(en_CursoRef, "zJVnuRYwoNdzxdcoNwcEfbqvws53"); // <--- Aquí se debe cambiar el id del usuario por que va quemado
      await updateDoc(en_CursoUp, {
        latitude:   0,
        longitude:  0,
        state:      false,
      });
      console.log("Se actualizo el documento en la coleccion de en_Curso con exito")
    } catch (error) {
      console.log("Error al actualizar en en_Curso: ", error);
    }

    // Eliminando el viaje de la coleccion de Horarios
    try{
      const horariosRef = collection(db, "Horarios");
      const horariosDel = doc(horariosRef, id_HorarioC);
      await deleteDoc(horariosDel);
      console.log("Se elimino el documento en la coleccion de Horarios con exito")
    } catch (error) {
      console.log("Error al eliminar en Horarios: ", error);
    }

    Alert.alert(
      "Finalizar viaje", 
      "Se finalizó el viaje con exito",
      [
        { text: "OK", onPress: () => props.navigation.navigate("Schedules") }
      ]
      );
    // props.navigation.navigate("Schedules");
  }
  
  // disparador de redux
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // varianles de navegacion 
  const [origin,setorigin] = React.useState({
    latitude: 13.706546231782209,
    longitude: -89.21181117711335,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  const [destination,setdestination] = React.useState({
    latitude:  13.715196613181005,
    longitude: -89.23903416315856,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View>
      <MapView
        initialRegion={origin}
        style={styles.Maps}
        //showsUserLocation={true}
        //showsMyLocationButton={true}
        //userLocationUpdateInterval={10000}
      >
        < Marker 
          draggable
          coordinate={destination}
        />
         <MapViewDirections
          origin={origin}
          destination={destination}
          apikey = {APY_KEY_MAPS}
          // apikey = {"AIzaSyCaKVGoux3o20djdGdCXBGGsarnyePm87E"}
          strokeWidth={3}
          mode="DRIVING"
          strokeColor="hotpink"
          timePrecision="now"
          precision='high'
          />

      </MapView>
      {/* <Text style={{position: 'absolute', top: 80, left: 50 ,height:300,width:200, backgroundColor:'blue' }} >Probando </Text> */}

      {/* <TouchableOpacity style={{ position: 'absolute', top: 100 }} onPress={ () => finalizarViaje()}> */}
      <TouchableOpacity style={{ position: 'absolute', top: 100 }} onPress={ () => btnFinalizarViaje()}>
        <View style={{ height: 55, backgroundColor: '#ffffff' }}>
          <Text>Finalizar Viaje</Text>
        </View>
      </TouchableOpacity>
      
    </View>
  )
}

export default NavigatorDriverScreen

const styles = StyleSheet.create({
  Maps:{
    width: '100%',
    height: '100%',
  },
})