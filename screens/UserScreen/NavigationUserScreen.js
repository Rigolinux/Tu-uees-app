import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import {APY_KEY_MAPS} from '@env'




//redux components
import { useSelector,useDispatch } from 'react-redux';
import {setOrigin} from '../../src/redux/states/travel/origin';


import {db} from '../../backend/firebase';
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "en_Curso", "zJVnuRYwoNdzxdcoNwcEfbqvws53");





const NavigationScreen = () => {


  // disparador de redux
  const dispatch = useDispatch();

  
 
  //hooks
  const [travel,setTravel] = React.useState(true)
   
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
  // para verificar si el transportista tiene un viaje asignado
  const [state,setState] = React.useState(false)

  // ver el estado del transporte en curso
  const[statePasanger,setStatePasanger] = React.useState(1)
 
  const getmyPosition = async () => {
  
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
    let location = await Location.getCurrentPositionAsync({})
    setorigin({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
   
    });
    
    dispatch(setOrigin(origin));
    

 }
  

  React.useEffect( () => {
      getmyPosition().then(()=>{
        console.log("empiezo a navagar");
        setTravel(true);
      })

    
      
  },[]);

  const getCurrentDriverPosition = async () => {
    
    const docSnap = await getDoc(docRef).then((doc) => {
    if (doc.exists()) {
      const {latitude,longitude,state, statePasanger } = doc.data();
      setdestination({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setState(state)
      setStatePasanger(statePasanger);
      console.log("mira lo que traje hdp",doc.data());
  }});
}

  const startTravel = () =>{
  
  }
 
  const stoptTravel = () =>{

  }
  
 
  

 

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
        getCurrentDriverPosition();
      }}
        >
      

      <Marker
      draggable
      coordinate={destination}
     
      
      >
      </Marker>
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
      
      <TouchableOpacity style={{ position: 'absolute', top: 100 }}>
      <View style={{ height: 55, backgroundColor: '#ffffff' }}>
          <Text>Button</Text>
      </View>
  </TouchableOpacity>
      <Text style={{position: 'absolute', top: 80, left: 50 ,height:300,width:200}} onPress={()=> {console.log("haz algo")}} >Hola</Text>
      
      
    </View>
  )
}

export default NavigationScreen

const styles = StyleSheet.create({
  
  Maps:{
    width: '100%',
    height: '100%',
  },
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  Topm: {
    marginTop: Constants.statusBarHeight,

  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#ff0000',
  },
  

})