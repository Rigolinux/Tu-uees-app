import { View, Text,StyleSheet,TouchableOpacity,Image } from 'react-native'
import { Slider } from '@rneui/themed';
import React from 'react'

import { useSelector,useDispatch } from 'react-redux';
import {getDestinationFromDatabase} from '../src/redux/states/travel/destination';

//colors 
import {colors} from '../utils/colors'

//mapa
import MapView, { Marker } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import {APY_KEY_MAPS} from '@env'

const Tanques = require('../assets/images/icons/Tank/TN.png');
const Bus = require('../assets/images/icons/bus/MONOCROMATICO.png');
const Zepelin = require('../assets/images/icons/zeepelin/ZN.png');
const prueba = require('../assets/images/icons/test/AA.png');
const SettingsScreen = () => {
    
  //hooks
  const [value, setValue] = React.useState(1);
  const [icon, setIcon] = React.useState(1);
  const [icons, setIcons] = React.useState([true,false,false]);
  const [test, setTest] = React.useState(Bus);
  const [colorline, setColorline] = React.useState("white");

  //coordinates
  const [origin, setorigin] = React.useState({
    latitude: 13.706546231782209,
    longitude: -89.21181117711335,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [destination, setdestination] = React.useState({
    latitude: 13.715196613181005,
    longitude: -89.23903416315856,
    latitudeDelta: 0.1922,
    longitudeDelta: 0.0421,
  });
    
  const updateSelected = (number) => {

    switch(number){
      case 1:
        setIcons([true,false,false]);
        setIcon(1);
        setTest(Bus);
        break;
      case 2:
        setIcons([false,true,false]);
        setIcon(2);
        setTest(Zepelin);
        
        break;
      case 3:
        setIcons([false,false,true]);
        setIcon(3);
        setTest(Tanques);
        break;
      
    }

  }
  //campos a crear un icon,value as ancho de la linea, color de la linea
  /* 
  Icon = icono de referncia
  Color = color de la linea
  values = es el ancho de la linea

  */
  const saveDataValues = () =>{
    //guardar datos en la base de datos
    console.log("guardar datos en la base de datos");
  }

  const restartConfig = () => {
    setIcons([true,false,false]);
    
    setIcon(1);
    setTest(Bus);
    setValue(3);
    setColorline("red");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <View style={styles.rowContainer}> 
      <Text style={styles.subtitle}>Ancho de direccion:  </Text>
      <Text style={{color:colors.two,fontSize:15}}>{value}</Text>
      </View>
      <Slider
        value={value}
        onValueChange={setValue}
        maximumValue={10}
        minimumValue={1}
        step={1}
        allowTouchTrack
        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
        thumbStyle={{ height: 20, width: 20, backgroundColor: colors.three }}
        
      />
      

      <Text style={styles.subtitle}>Color de direccion</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={[styles.circle,{backgroundColor:"red"}]} onPress={() => setColorline("red")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"blue"}]} onPress={() => setColorline("blue")} /> 
        <TouchableOpacity style={[styles.circle,{backgroundColor:"green"}]} onPress={() => setColorline("green")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"violet"}]} onPress={() => setColorline("violet")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"pink"}]} onPress={() => setColorline("pink")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"white"}]} onPress={() => setColorline("white")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"black"}]} onPress={() => setColorline("black")} />
        <TouchableOpacity style={[styles.circle,{backgroundColor:"aqua"}]} onPress={() => setColorline("aqua")} />
      </View>
      
      <Text style={styles.subtitle}>Tipo de iconos</Text>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={icons[0] ? styles.CardSelected : styles.Card}  onPress={()=>updateSelected(1)} >
        
          <Image source={Bus} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={icons[1] ? styles.CardSelected : styles.Card} onPress={()=>updateSelected(2)}>
          
          <Image source={Zepelin} style={styles.image} />
        </TouchableOpacity>
        <TouchableOpacity style={icons[2] ? styles.CardSelected : styles.Card} onPress={()=>updateSelected(3)}>
          
          <Image  source={Tanques} style={styles.image} />
        </TouchableOpacity>
      </View>
      <Text style={styles.subtitle}>Vista Previa</Text>
    <MapView
      style={styles.map}
      initialRegion={origin}
      
      
    >
      <Marker 
        coordinate={origin}

      />
      <Marker 
        coordinate={destination}
        image={prueba}
        style={styles.imagemarker}
      />
      <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={APY_KEY_MAPS}
    strokeWidth={value} strokeColor={colorline}
    /> 
    </MapView>
    <View style={styles.rowContainer}>
      <TouchableOpacity style={styles.savbtn} onPress={()=>saveDataValues()}>
        <Text style={styles.Text}>Guardar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.savbtn,{backgroundColor:"red"}]} onPress={()=>restartConfig()}>
        <Text style={styles.Text}>Restablecer Configuración</Text>
      </TouchableOpacity>
    </View>
      
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({

  container:{
    padding: 20,
    width: '100%',
    alignItems: 'stretch',
    backgroundColor: colors.five,
    height: '100%',

  },
  title:{
    color: colors.one,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle:{
    color: colors.two,
    fontSize: 15,
    fontWeight: 'bold',
  } ,
  Text: {
    color : colors.six,
    
  },
  Card:{
    backgroundColor: "white",
    width: 100,
    height: 100,
    borderRadius: 2,
    margin: 10,
  },
  CardSelected:{
    backgroundColor: "gray",
    width: 100,
    height: 100,
    borderRadius: 2,
    margin: 10,
  }
  ,
  rowContainer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  map:{
    width: '60%',
    height: '40%',
    position: 'absolute',
    marginTop: 340,
    marginLeft: 100,
  },
  savbtn:{
    backgroundColor: colors.three,
    width: 140,
    height: 60,
    borderRadius: 5,
    marginTop: 310,
    marginLeft: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },

  image:{
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop:20
  },
  imagemarker:{
    width: 50,
    height: 50,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 3,
    marginLeft: 10,
  },
  
})