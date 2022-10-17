import { StyleSheet, Text, View,TouchableOpacity,Alert,StatusBar,BackHandler} from 'react-native'
import React from 'react';
import MapView,{Marker} from 'react-native-maps';
import Constants from 'expo-constants';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';

import {APY_KEY_MAPS} from '@env'


// icons close 
import { AntDesign } from '@expo/vector-icons';

//redux components
import { useSelector,useDispatch } from 'react-redux';

import {cleandtaTravel} from '../../src/redux/states/travel/data';

import {db} from '../../backend/firebase';
import { doc, getDoc,collection,query,getDocs,where } from "firebase/firestore";

//navigation
import { useNavigation } from '@react-navigation/native';




//icons
//tanks icons
const tankR = require('../../assets/images/iconsUser/Tank/TR.png');
const tankA = require('../../assets/images/iconsUser/Tank/TA.png');
const tankV = require('../../assets/images/iconsUser/Tank/TV.png');
//zepellin icons
const zepellinR = require('../../assets/images/iconsUser/zeepelin/ZR.png');
const zepellinA = require('../../assets/images/iconsUser/zeepelin/ZA.png');
const zepellinV = require('../../assets/images/iconsUser/zeepelin/ZV.png');
//bus icons
const busR = require('../../assets/images/iconsUser/bus/R.png');
const busA = require('../../assets/images/iconsUser/bus/A.png');
const busV = require('../../assets/images/iconsUser/bus/V.png'); 


const NavigationScreen = () => {

  //hooks of icons
  const [icon,setIcon] = React.useState(busV);
  const [colorline,setColorline] = React.useState("white");
  const [sizeline,setSizeline] = React.useState("1");
  const [iconType,setIconType] = React.useState(1);
  //update visual icons
  const updateIcon = (value) => {
    switch (value) {
      case 1:
        setIcon(busV);
          break;
      case 2:
        setIcon(zepellinV);
        break;
      case 3:
        setIcon(tankV);
        break;

    }

  }
  const updateImagestate =(value) => {
    switch (iconType) {
      case 1:
        switch (value) {
          case 1:
            setIcon(busV);
            break;
          case 2:
            setIcon(busA);
            break;
          case 3:
            setIcon(busR);
            break;
            }
          break;
      case 2:
        switch (value) {
          case 1:
            setIcon(zepellinV);
            break;
          case 2:
            setIcon(zepellinA);
            break;
          case 3:
            setIcon(zepellinR);
            break;
          }
        break;
      case 3:
        switch (value) {
          case 1:
            setIcon(tankV);
            break;
          case 2:
            setIcon(tankA);
            break;
          case 3:
            setIcon(tankR);
            break;
         }
        break;

    }

  }

  //profile data
  const profile = useSelector(state => state.profile);

  //get db icons
  const chargeSettings = () => {
    const perfilesSettingsCollection  = collection(db, "Perfiles");
    const perfilesSettingsFilter      = query(perfilesSettingsCollection, where("id_user", "==", profile.id_user));
    const perfilesSettings            = [];
    const perfilesSettingsSnap        = getDocs(perfilesSettingsFilter);
    perfilesSettingsSnap.then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        perfilesSettings.push({
          id: doc.id,
          ...doc.data()
        });
      });
    

      let colorcharge = perfilesSettings[0].color;
      let valuecharge = perfilesSettings[0].values;
      
      setColorline(colorcharge);

      updateIcon(perfilesSettings[0].icon);
      setIconType(perfilesSettings[0].icon);

      setSizeline(valuecharge);

    });
  }

  //navegacion
  const navigation = useNavigation();

  // disparador de redux
  const dispatch = useDispatch();

  //selector de redux
  const datos = useSelector(state => state.data);

  //ref de viaje
  const docRef = doc(db, "en_Curso", datos.id_travel); 
 
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
  // para verificar si el transportista tiene un viaje asignado
  const [state,setState] = React.useState(false)

  // ver el estado del transporte en curso
  const[statePasanger,setStatePasanger] = React.useState(1)
  const [description,setDescription] = React.useState("");

  const [colorbtn,setColorbtn] = React.useState("green");
  const [textbtn,setTextbtn] = React.useState("Iniciar rastreo");




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
    
    
    

 }
  

  React.useEffect( () => {
      chargeSettings();
      getmyPosition().then(()=>{
        console.log("empiezo a navagar");
        setTravel(true);
      })
       //bloquear el return del telefono
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => backHandler.remove()
    
      
  },[]); 

  const titlestate = (busstate) => {
    let title = "";
    switch (busstate) {
      case "1":
        title = "Disponible";
        break;
      case "2":
        title = "Poco disponible";
        break;
      case "3":
        title = "No disponible";
        break;
      
    }
  }


const getCurrentDriverPosition = async () => {

  console.log("datos de la referencia",datos)
    
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
      
      setStatePasanger(statePasanger);
      updateImagestate(statePasanger);
      console.log("mira lo que traje hdp",doc.data());
      console.log("destino",destination);
      }
      else{
        console.log("el viaje que buscas ha terminado");
        setTravel(false);
        Alert.alert("Error","El viaje que buscas ha terminado o ya no esta disponible");
        navigation.navigate("Home");
      }
  }});
} 

   
 
  const stoptTravel = () =>{
        setTravel(false);
        
        navigation.navigate("Home");

  }
  
 
  

 
 const Travelstatus = () => {

  if(!travel){
    setTravel(true);
    setColorbtn("red");
    setTextbtn("Detener rastreo");
  }
  else{
    setTravel(false);
    setColorbtn("green");
    setTextbtn("Iniciar rastreo");
  }


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
      image={icon}

      title={titlestate(statePasanger)}
     
      >
      </Marker>

       <MapViewDirections
        origin={origin}
        destination={destination}
        apikey = {APY_KEY_MAPS}
        strokeWidth={sizeline}
        mode="DRIVING"
        strokeColor={colorline}
        timePrecision="now"
        precision='high'
        />
      </MapView> 
      
      <StatusBar
        animated={true}
        backgroundColor={!travel ? "red" : "green"}
        barStyle={'default'}
        showHideTransition={"fade"}
        
        
        />
      <TouchableOpacity style={{ position: 'absolute',justifyContent:"center" ,bottom: 8, height: 50, marginLeft: 70,alignItems:"flex-end" }} onPress={() => Travelstatus()} >
      <View style={{ height: 50,width:300, backgroundColor:colorbtn,marginBottom:5,justifyContent:"center",alignItems:"center", borderRadius:5,marginTop:25 } } >
          <Text style={{color:"#ffff",fontSize: 15}} >{textbtn}</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style={{position:'absolute',alignItems:'flex-end',margin:10}} onPress={() => stoptTravel()}>
        <View style={{height:70,width:70 ,backgroundColor:'red',borderRadius:35,marginBottom:5,justifyContent:'center',alignItems:'center'}}>
          <AntDesign name="close" size={44} color="white"/> 
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