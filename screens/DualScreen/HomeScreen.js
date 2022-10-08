import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,StatusBar} from 'react-native'
import React from 'react'
import { auth } from '../../backend/firebase'
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";


//redux components
import { useSelector,useDispatch } from 'react-redux';
import {cleanProfile} from '../../src/redux/states/profile';

import {colors} from '../../utils/colors'

const HomeScreen = () => {

  const dispatch = useDispatch();
  
    
    const perfil = () => {
      const r = useSelector((state) => state.profile);
      console.log(r)
    }
  
  const navigation = useNavigation();

  
  const handleLogout = () => {
    auth.signOut()
    .then(() => {
      console.log("Signed Out");
      dispatch(cleanProfile());
      navigation.navigate("Login");
    }).catch((error) => {
      console.log(error);
    }
    );
  }
  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  }

  React.useEffect(() => {
      
  },[]);

  const mapago = () => {
    navigation.navigate("DriverNavigation");
  }
  return (
    <SafeAreaView  >
      
    <View style={styles.container}>
      <StatusBar backgroundColor="black" hidden={false} />
      <Text style={styles.title}>Perfil</Text>
      <Text style={styles.subtitle}>Correo Electronico</Text>
      <TouchableOpacity style={ styles.box} >
      <Text style={styles.text} >{auth.currentUser?.email}</Text>
      </TouchableOpacity>
     
      <TouchableOpacity style={styles.button}>
        <Text onPress={handleChangePassword} style={styles.butonntext} >Cambiar Contraseña</Text>
      </TouchableOpacity>
    
     <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.butonntext}>Logout</Text>
      </TouchableOpacity>
      

      <Text onPress={mapago}>ir a mapa</Text>
      
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: colors.five,
    alignItems: 'flex-start',
    

  },
  
  title:{
    color: colors.one,
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    
    marginLeft: 10,
    marginTop: 10,
  },
  subtitle:{
    
    color: colors.two,
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    
  },
  text:{
    color: colors.six,
  },
  box:{
    backgroundColor: colors.three,
    opacity: 0.6,
    borderRadius: 2,
    marginLeft: 30,
    height: 30,
    width: 200,
    marginBottom: 10,
    justifyContent: 'center',
    
  },
  button:{
    backgroundColor: "red",
    opacity: 0.8,
    borderRadius: 5,
    marginLeft: 30,
    width: 200,
    marginBottom: 10,
    height: 30,
    justifyContent: 'center',
    
  },
  butonntext:{
    color: colors.six,
    textAlign: 'center',
  }

  
})