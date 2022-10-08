import {
    KeyboardAvoidingView,
    StyleSheet,
    TextInput,
    View,Text,TouchableOpacity
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
  
  
  
  const Loginscreen = () => {
    const dispatch = useDispatch();
  
    const navigation = useNavigation();
  
    const [email, setEmail] = React.useState("conductor@gmail.com");
    const [password, setPassword] = React.useState("123456");
    
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
        console.log(email);
        console.log(password);
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
      console.log(error);
    })
    }
    
    const handleCreateAccount = () => {
     
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.email);
      })
      .catch((error) => {
      console.log(error);
      // ..
      });
    };
  
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.title}>TUEES APP</Text>
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
    );
  };
  
  export default Loginscreen;
  
  const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: colors.five,
    },
    inputContainer: {
    },
    input: {
      backgroundColor: colors.one,
      opacity: 0.3,
      marginBottom: 30,
      borderRadius: 3,
      textAlign: "center",
      width: 200,
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
      width: 200,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: "center",
      color: "white",
    },
    Text: {
      color : colors.one,
      
    },
    title: {
      color: colors.one,
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 30,
    },
    
  });