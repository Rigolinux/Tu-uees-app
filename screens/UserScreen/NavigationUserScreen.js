import { StyleSheet, Text, View,TouchableOpacity,Alert,StatusBar} from 'react-native'
import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import {APY_KEY_MAPS} from '@env'




//redux components
import { useSelector,useDispatch } from 'react-redux';

import {cleandtaTravel} from '../../src/redux/states/travel/data';

import {db} from '../../backend/firebase';
import { doc, getDoc } from "firebase/firestore";

//navigation
import { useNavigation } from '@react-navigation/native';

const carImage = require('../../assets/images/car.png');




const NavigationScreen = () => {


  //navegacion
  const navigation = useNavigation();

  // disparador de redux
  const dispatch = useDispatch();

  //selector de redux
  const datos = useSelector(state => state.data);

  //ref de viaje
  //const docRef = doc(db, "en_Curso", datos.id_travel); 
 
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
  const[statePasanger,setStatePasanger] = React.useState("1")
  const [description,setDescription] = React.useState("")
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

/*   const getCurrentDriverPosition = async () => {
    
    const docSnap = await getDoc(docRef).then((doc) => {
    if (doc.exists()) {
      const {latitude,longitude,state, statePasanger} = doc.data();
      if(state){
      setdestination({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
      setState(state)
      setTravel(state)
      setStatePasanger(statePasanger);
      console.log("mira lo que traje hdp",doc.data());
      }
      else{
        console.log("no hay viaje asignado");
        setTravel(false);
        dispatch(cleandtaTravel());
        navigation.navigate("Home");
      }
  }});
}

   */
 
  const stoptTravel = () =>{
        setTravel(false);
        dispatch(cleandtaTravel());
        navigation.navigate("Home");

  }
  
 
  const pam = () => {
    if(!travel){
      setTravel(true);
    }
    else{
      setTravel(false);
    }
  }
  React.useEffect( () => {

  },[statePasanger,setStatePasanger]);
 const updatestatedestination = () => {
    console.log("voy a actualizar el estado del destino");
    setStatePasanger("2");
    console.log("el estado del destino es",statePasanger);
 }

  return (
    <View>
       <MapView
      initialRegion={origin}
      style={styles.Maps}
      //showsUserLocation={travel}
      showsMyLocationButton={true}
      userLocationUpdateInterval={10000}
      onUserLocationChange={(event) => {
        setorigin({
          latitude: event.nativeEvent.coordinate.latitude,
          longitude: event.nativeEvent.coordinate.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          
        });
        //getCurrentDriverPosition();
      }}
        >
      

      <Marker
      draggable
      coordinate={destination}
      title="Pasajero"
      description={()=>{()=>updatestatedestination()}}
      
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
      
      <TouchableOpacity style={{ position: 'absolute', top: 100 } }>
      <View style={{ height: 55, backgroundColor: '#ffffff' }}  onPress={()=> pam}>
          <Text>Button</Text>
      </View>
  </TouchableOpacity>
      <Text style={{position: 'absolute', top: 80, left: 50 ,height:300,width:200}} onPress={()=> {console.log(datos)}} >Hola</Text>
      <TouchableOpacity style={{ position: 'absolute',justifyContent:"center" ,bottom: 8, height: 50, marginLeft: 70,alignItems:"flex-end" }} >
      <View style={{ height: 50,width:300, backgroundColor: 'red',marginBottom:5,justifyContent:"center",alignItems:"center", borderRadius:5,marginTop:25 } }>
          <Text style={{color:"#ffff",fontSize: 15}} onPress={() => stoptTravel()}>Button</Text>
      </View>
      </TouchableOpacity>
      
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