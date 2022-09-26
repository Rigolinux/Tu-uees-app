import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//maps view
import MapView,{Marker} from 'react-native-maps'
import Constants from 'expo-constants'
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location';

//api key
import {APY_KEY_MAPS} from '@env'

//redux components
import { useSelector,useDispatch } from 'react-redux';
import {setOrigin} from '../../src/redux/states/travel/origin';

//navigation}
import { useNavigation } from "@react-navigation/native";

const NavigatorDriverScreen = () => {
  

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

  React.useEffect( async() => {
    const travel= true
    // preguntar si tiene viaje asignado
      
    // si tiene viaje asignado
    if(travel){
      //let { status } = await Location.requestForegroundPermissionsAsync();
       //if (status !== 'granted') {
      //alert('Permission to access location was denied');
     // return;
    //}
     // let location = await Location.getCurrentPositionAsync({});
      // setorigin({
      // latitude: location.coords.latitude,
      // longitude: location.coords.longitude,
      // });
    }
     // si no tiene viaje asignado
    else{
      alert("No tienes viajes asignados");
      navigation.navigate("Schedules");
    }
   
    
      
    
  },[]);

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
          strokeWidth={3}
          mode="DRIVING"
          strokeColor="hotpink"
          timePrecision="now"
          precision='high'
          />

      </MapView>
      <Text style={{position: 'absolute', top: 80, left: 50 ,height:300,width:200, backgroundColor:'blue' }} >Hola</Text>
      
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