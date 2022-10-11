import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity,StatusBar,TextInput,Alert} from 'react-native'
import React from 'react'

import Constants from 'expo-constants';
import { useNavigation } from "@react-navigation/native";

//firebase 
import { getAuth,updatePassword,signOut} from 'firebase/auth'

//redux components
import { useSelector,useDispatch } from 'react-redux';
import {cleanProfile} from '../../src/redux/states/profile';

import {colors} from '../../utils/colors'

const HomeScreen = () => {

  const auth = getAuth();
  const user = auth.currentUser;

  const dispatch = useDispatch();
  
    
    const perfil = () => {
      const r = useSelector((state) => state.profile);
      console.log(r)
    }
  
    //password hooks
    const [password, setPassword] = React.useState("");
    const [repassword, setRePassword] = React.useState("");
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
  const ChanguePassword = () => {

    updatePassword(user,password).then(()=>{
      Alert.alert("Contraseña cambiada con exito");
      handleLogout();
    }).catch(error=>{
      Alert.alert("Error al cambiar la contraseña");
      console.log(error.message);
    });
  }

  const handleChangePassword = async() => {
    if(password == "" || repassword == ""){
      Alert.alert("Error!", "Las contraseñas deben tener al menos un valor");
    }
    else{
       if(password==repassword){
        
       ChanguePassword();

      }
      else{
        Alert.alert("Error!", "Las contraseñas no coinciden");

      }
    }
  }

  React.useEffect(() => {
      
  },[]);

  const mapago = () => {
    navigation.navigate("UserNavigation");
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
     
      <Text style={styles.subtitle}>Cambiar Contraseña</Text>
      <TouchableOpacity style={[styles.box,{opacity:1}]}>
        <TextInput value={password} onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true} style={styles.butonntext} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.box,{opacity:1}]}>
        <TextInput value={repassword} onChangeText={(text)=>{setRePassword(text)}} secureTextEntry={true} style={styles.butonntext} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text onPress={()=>handleChangePassword()} style={styles.butonntext} >Cambiar Contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogout} style={styles.button}>
        <Text style={styles.butonntext}>Cerrar Sesion</Text>
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