import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import { auth } from '../../backend/firebase'
import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";


//redux components
import { useSelector,useDispatch } from 'react-redux';
import {getOrigin} from '../../src/redux/states/travel/origin';

const HomeScreen = () => {
  
  
    const origin = useSelector((state) => state.origin.latitude);
    console.log(origin);
  
  
  const navigation = useNavigation();

  const handleLogout = () => {
    auth.signOut()
    .then(() => {
      console.log("Signed Out");
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


  return (
    <SafeAreaView style={styles.Topm} >
    <View>
      <Text>Home Screen</Text>
     <Text>Email:{auth.currentUser?.email}</Text>
      <TouchableOpacity>
        <Text onPress={handleChangePassword}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    
     <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>{origin}</Text>
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

  },
  Topm: {
    marginTop: Constants.statusBarHeight,

  }

})