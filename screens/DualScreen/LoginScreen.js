import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,Text,TouchableOpacity, Alert, ImageBackground
  } from "react-native";
  import React from "react";
  
  import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
  
  //navigation
  import { useNavigation } from "@react-navigation/native";


  //db
  import { collection, doc, getDocs, where,query } from 'firebase/firestore'
  import { db } from '../../backend/firebase'

// redux
import {useSelector,useDispatch} from 'react-redux'
import {getProfile} from '../../src/redux/states/profile'

//colors
import {colors} from '../../utils/colors'





  //auth firebase
  const auth = getAuth();
  
 //images  
  const fondo = require("../../assets/images/uees1.jpg");
  const Loginscreen = () => {
    const dispatch = useDispatch();
  
    const navigation = useNavigation();
  
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
    const [datos, setDatos] = React.useState([]);    
    
    React.useEffect(() => {
     

      auth.onAuthStateChanged( user => {
        
          const unsubscribe = auth.onAuthStateChanged(user => {
            navigation.navigate("Login");
            if(user){
              dispatch(getProfile(user.uid));
              
                 

            }
            else{
              navigation.navigate("Login");
            }
            //setEmail("");
            //setPassword("");
            
          })
          
  
          return unsubscribe;
      })
    } ,[])
   


    const handleLogin = () => {

      if(email==""){
        Alert.alert("Error","El campo correo esta vacio");
      } else if(password==""){
        Alert.alert("Error","El campo contraseña esta vacio");
      } else{
        // console.log(email);
        // console.log(password);
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("login promesa",userCredential);
      console.log("login promesa",userCredential.user.uid);
      const profileRef = collection(db, 'Perfiles');
      const profile = query(profileRef, where("id_user", "==", userCredential.user.uid));
        const execute = async () => {
          let values = {};
          const querySnapshot = await getDocs(profile).then((querySnapshot) => {
           const data = querySnapshot.docs.map((doc) => (
          {correo,id_user,type_user } = doc.data(),
          values.correo =  correo,
          values.id_user = id_user,
          values.type_user = type_user,
          values.travel = false
          
          ))
          
        }).then(() => {
          //console.log("data",values)
          setDatos(values);
          dispatch(getProfile(values));
        }).then(() => {
          if(values.type_user === true){
          navigation.navigate("Driver")}
          else{
            navigation.navigate("User")
          }
  
          })
        }
       return execute(); 
    })
    .catch((error) => {
      console.log(error.message);
      if(error.message == "Firebase: Error (auth/invalid-email)."){
        Alert.alert("Error","El correo ingresado no es valido");
      } else if(error.message == "Firebase: Error (auth/user-not-found)."){
        Alert.alert("Error","El usuario ingresado no existe");
      } else if(error.message == "Firebase: Error (auth/wrong-password)."){
        Alert.alert("Error","La contraseña ingresada es incorrecta");
      }
    })
      }
    }  
  
    return (
      <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>TUees</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.Text}>Ingrese Usuario</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <Text style={styles.Text}>Ingrese Contraseña</Text>
          <TextInput
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            style={styles.input}
          />
        </View>
  
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
      </ImageBackground>
    );
  };
  
  export default Loginscreen;
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      
    },
    image: {
      flex: 1,
      justifyContent: "center"
    }
    ,
    inputContainer: {
    },
    input: {
      textAlign: "center",
      backgroundColor: colors.one,
      opacity: 0.9,
      marginBottom: 30,
      borderRadius: 3,
      width: 250,
      height: 35,
      color: 'white',
      fontSize: 15,
      fontFamily:"sans-serif",
    },
    buttonOurlineText:{},
    buttonContainer: {},
    button: {
      backgroundColor: colors.two,
      marginBottom: 15,
      padding: 10,
      width: 250,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
    },
    Text: {
      color : colors.six,
      
    },
    title: {
      color: colors.six,
      fontSize: 40,
      fontWeight: "bold",
      marginBottom: 30,
    },
    
  });