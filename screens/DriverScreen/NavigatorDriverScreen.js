import { StyleSheet, Text, View,TouchableOpacity, Alert} from "react-native";
import React from "react";

//maps view
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";

//api key
import { APY_KEY_MAPS } from "@env";

//redux components
import { useSelector, useDispatch } from "react-redux";

//db
import { collection, doc, updateDoc, where, query,deleteDoc } from "firebase/firestore";
import { db } from "../../backend/firebase";

//navigation}
import { useNavigation } from "@react-navigation/native";

//buttons
import { SpeedDial } from "@rneui/themed";


const NavigatorDriverScreen = () => {
  // disparador de redux
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //redux data
  const { id_user } = useSelector((state) => state.profile);


  const datatrips = useSelector((state) => state.data);
  //variables de botones
  const [open, setOpen] = React.useState(false);
  const [pasanger, setPasanger] = React.useState("1");

  // varianles de navegacion
  const [travel, setTravel] = React.useState(false);
  const [origin, setorigin] = React.useState({
    latitude: 13.706546231782209,
    longitude: -89.21181117711335,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [destination, setdestination] = React.useState({
    latitude: 13.715196613181005,
    longitude: -89.23903416315856,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  // React.useEffect(async () => {
  //   // preguntar si tiene viaje asignado

  //   // si tiene viaje asignado

  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Permission to access location was denied");
  //     navigation.navigate("Schedules");

  //     return;
  //   }
  //   let location = await Location.getCurrentPositionAsync({});
  //   setorigin({
  //     latitude: location.coords.latitude,
  //     longitude: location.coords.longitude,
  //   });
  // }, []);

  // const Updatelocation = async () => {
  //   const locationeRef = doc(db, "en_Curso", id_user);
  //   await updateDoc(locationeRef, {
  //     latitude: origin.latitude,
  //     longitude: origin.longitude,
  //     statePasanger: pasanger,
  //   })
  //     .then(() => {
  //       console.log("esta cambiando");
  //     })
  //     .catch((error) => {
  //       console.error("Error updating document: ", error);
  //     });
  // };

  // const btnConfirmarFinaldeViaje = () => {

  //   console.log("finalizar viaje");
  //   Alert.alert(
  //     "Finalizar viaje",
  //     "¿Está seguro de finalizar el viaje?",
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => FinishTravel() }
  //       // { text: "OK", onPress: () => btnconfFinalizarViaje() }
  //     ],
  //     { cancelable: false }
  //   );
    
  // }


  // const FinishTravel = async () => {
    
  //   console.log("finalizar viaje version 2");
  //   setTravel(false);
  //   //finalizar el viaje lo de kidito
  //   {

  //     const id_HorarioC = datatrips.id_travel;
  
  //     // Actualizando la coleccion Historial
  //     try{
  //       const historialRef = collection(db, "Historial");
  //       const histup = doc(historialRef, id_HorarioC);
  //       await updateDoc(histup, {
  //         finalizado: true,
  //         state:      false,
  //       });
  //       console.log("Se actualizo el documento en la coleccion de Historial con exito")
  //     } catch (error) {
  //       console.log("Error al actualizar en historial: ", error);
  //     }
  
      
  
  //     // Actualizando datos de la coleccion de en_Curso
  //     try{
  //       const en_CursoRef = collection(db, "en_Curso");
  //       const en_CursoUp = doc(en_CursoRef, id_user); // <--- Aquí se debe cambiar el id del usuario por que va quemado
  //       await updateDoc(en_CursoUp, {
  //         latitude:   0,
  //         longitude:  0,
  //         state:      false,
  //       });
  //       console.log("Se actualizo el documento en la coleccion de en_Curso con exito")
  //     } catch (error) {
  //       console.log("Error al actualizar en en_Curso: ", error);
  //     }
  
  //     // Eliminando el viaje de la coleccion de Horarios
  //     try{
  //       const horariosRef = collection(db, "Horarios");
  //       const horariosDel = doc(horariosRef, id_HorarioC);
  //       await deleteDoc(horariosDel);
  //       console.log("Se elimino el documento en la coleccion de Horarios con exito")
  //     } catch (error) {
  //       console.log("Error al eliminar en Horarios: ", error);
  //     }
  
  //     Alert.alert(
  //       "Finalizar viaje", 
  //       "Se finalizó el viaje con exito",
  //       [
  //         { text: "OK", onPress: () => navigation.navigate("SchedulesDriver") }
  //       ]
  //       );
  //     // props.navigation.navigate("Schedules");
  //   }
  //   //travel = false
  //   //navegar a horarios
  // };

  const colorpasanger = () => {
    if (pasanger == 1) {
      return "green";
    } else if (pasanger == 2) {
      return "yellow";
    } else if (pasanger == 3) {
      return "red";
    }
  }

  React.useEffect(() => {
    colorpasanger();
  },[pasanger]);


  const btnstart = () =>{
    setTravel(true);
  }

  return (
    <View>
      <MapView
        initialRegion={origin}
        style={styles.Maps}
        showsUserLocation={false}
        showsMyLocationButton={true}
        userLocationUpdateInterval={10000}
        onUserLocationChange={(event) => {
          setorigin({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          Updatelocation();
        }}
      >
        <Marker draggable coordinate={destination} />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={APY_KEY_MAPS}
          strokeWidth={3}
          mode="DRIVING"
          strokeColor="hotpink"
          timePrecision="now"
          precision="high"
        />
      </MapView>
      <TouchableOpacity style={{ position: 'absolute',justifyContent:"flex-end" ,bottom: 8, height: 50, marginLeft: 40 }} >
      <View style={{ height: 50,width:200, backgroundColor: 'red',marginBottom:5,justifyContent:"center",alignItems:"center",borderRadius:5 } } onPress={() => btnConfirmarFinaldeViaje()}>
          <Text style={{color :"white"}}>Terminar viaje</Text>
      </View>
      </TouchableOpacity>

      <TouchableOpacity  style={{ position: 'absolute',justifyContent:"flex-end" ,bottom: 70, height: 50, marginLeft: 40 }} onPress={()=>btnstart()}>
        <View style={{ height: 50,width:200, backgroundColor: 'green',marginBottom:5,justifyContent:"center",alignItems:"center",borderRadius:5 } } >
          <Text style={{color:"white"}}>Iniciar Rastreo </Text>
        </View>
      </TouchableOpacity>

      
      <SpeedDial
        isOpen={open}
        
        icon={{ name: "team",type:"antdesign", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
        color={colorpasanger()}
      >
        <SpeedDial.Action
          icon={{ name:"check",type:"antdesign", color: "#fff" }}
          title="Disponible"
          onPress={() => {setPasanger(1),setOpen(!open)}}
          color="green"
        />
        <SpeedDial.Action
          icon={{ name:"warning",type:"antdesign",color: "#fff" }}
          title="Poco disponible"
          onPress={() => {setPasanger(2),setOpen(!open)}}
          color="yellow"
        />
        
        <SpeedDial.Action
          icon={{ name:"close",type:"antdesign", color: "#fff" }}
          title="No disponible"
          onPress={() => {setPasanger(3),setOpen(!open)}}
          color="red"
        />
      </SpeedDial>
    </View>
  );
};

export default NavigatorDriverScreen;

const styles = StyleSheet.create({
  Maps: {
    width: "100%",
    height: "100%",
  },
});
