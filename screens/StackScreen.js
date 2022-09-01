import { Text, View,SafeAreaView,TouchableOpacity, TextInput,StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Constant from 'expo-constants'
import { getAuth,updatePassword,signOut} from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
export default function StackScreen() {

  const navigation = useNavigation();
  const auth = getAuth();

  const [password, setPassword] = React.useState("");
  const [repassword, setRePassword] = React.useState("");
  
   const ChanguePassword = () => {
    const user = auth.currentUser;
    if(password==repassword){
      updatePassword(user,password).then(()=>{
        console.log("Password Changed")
        signOut(auth);
        navigation.navigate("Login");
      }).catch(error=>{
        console.log(error)});
    }
  }
   
    return (
      <SafeAreaView style={{ flex: 1, marginTop: Constant.statusBarHeight }}>
      <View>
        
        <TextInput 
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder='Ingrese Consaeña'/>

        <TextInput 
        value={repassword}
        onChangeText={(text) => setRePassword(text)}
        placeholder='Confirme Contraseña' />

        <TouchableOpacity 
        onPress={ChanguePassword}>
          <Text>Cambiar Contraseña</Text>
          
        </TouchableOpacity>

      </View>
      </SafeAreaView>
    )
  
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});