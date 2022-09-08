import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react';
import MapView,{Marker,Polyline} from 'react-native-maps';
import Constants from 'expo-constants';
const carImage = require('../../assets/images/car.png');
const NavigationScreen = () => {
  const [origin,setorigin] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const description = "Mi ubicación";
   
  return (
    <View>
       <MapView
      initialRegion={origin}
      style={styles.Maps}
        >
      <Marker
      draggable
      coordinate={origin}
      description={description}
      image ={ carImage}
      />
      </MapView>
      <Text style={{position: 'absolute', top: 20, left: 50 }} >Coito</Text>
      
      
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