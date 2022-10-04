import { StyleSheet, Text, View,TouchableOpacity, } from "react-native";
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
import { collection, doc, updateDoc, where, query } from "firebase/firestore";
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
  const travel = false

  //variables de botones
  const [open, setOpen] = React.useState(false);
  const [pasanger, setPasanger] = React.useState(1);
  // varianles de navegacion
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

  React.useEffect(async () => {
    // preguntar si tiene viaje asignado

    // si tiene viaje asignado

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      navigation.navigate("Schedules");

      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setorigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }, []);

  const Updatelocation = async () => {
    const locationeRef = doc(db, "en_Curso", id_user);
    await updateDoc(locationeRef, {
      latitude: origin.latitude,
      longitude: origin.longitude,
      statePasanger: pasanger,
    })
      .then(() => {
        console.log("esta cambiando");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  const FinishTravel = async () => {
    //finalizar el viaje lo de kidito
    //travel = false
    //navegar a horarios
  };

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

  return (
    <View>
      <MapView
        initialRegion={origin}
        style={styles.Maps}
        showsUserLocation={travel}
        showsMyLocationButton={true}
        userLocationUpdateInterval={10000}
        onUserLocationChange={(event) => {
          setorigin({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
          //Updatelocation();
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
      <TouchableOpacity style={{ position: 'absolute',justifyContent:"flex-end" ,bottom: 8, height: 50, marginLeft: 30 }}>
      <View style={{ height: 50,width:300, backgroundColor: 'red',marginBottom:5,justifyContent:"center",alignItems:"center" }}>
          <Text>Button</Text>
      </View>
      </TouchableOpacity>
      
        <Text
        style={{
          position: "absolute",
          top: 80,
          left: 50,
          height: 300,
          width: 200,
          backgroundColor: "blue",
        }}
      >
        Hola
      </Text>
      
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
