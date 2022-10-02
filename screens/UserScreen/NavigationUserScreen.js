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
import { getDocs,collection } from "firebase/firestore";

const database = collection(db,'xx');

const getCurrentPosition = async () => {
    
    try {
       const x = await getDocs(database).then((document) => {
            const dataDb = document.docs.map((doc) => (doc.data()));
            
            return dataDb;
    });
        return x;
    } catch (error) {
        console.log(error);
    }
}


const NavigationScreen = () => {


  // disparador de redux
  const dispatch = useDispatch();

  
 
  //hooks
  const [travel,setTravel] = React.useState(false)
   
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

    
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
      let location = await Location.getCurrentPositionAsync({});
      setorigin({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
     
      });
      
      dispatch(setOrigin(origin));
      
      
  },[]);

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
      showsMyLocationButton={travel}
      userLocationUpdateInterval={10000}
      onUserLocationChange={(event) => {
        setorigin({
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          
        });
        getCurrentPosition().then((data) => {
          setdestination({
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        });
        
        
        

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
      <Text style={{position: 'absolute', top: 80, left: 50 ,height:300,width:200}} onPress={()=> {handletravel()}} >Hola</Text>
      
      
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