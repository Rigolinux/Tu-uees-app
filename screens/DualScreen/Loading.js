import { View, Text } from 'react-native'
import React from 'react'


    import {useSelector} from 'react-redux'

    import { useNavigation } from "@react-navigation/native";
    
const Loading = () => {

    const navigation = useNavigation();
    const typeusr = useSelector((state) => state.profile);
    React.useEffect(() => {
        console.log("loading")
        console.log(typeusr);
      if(!typeusr){
        console.log("no es usuario")
        navigation.navigate("Driver");
      }
      else{
        console.log("es usuario")
        navigation.navigate("User");
      }
  },[]);


  return (
    <View>
      <Text>Cargando</Text>
    </View>
  )
}

export default Loading