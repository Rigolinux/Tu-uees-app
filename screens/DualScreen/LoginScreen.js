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
  
  const auth = getAuth();
  
  
  const Loginscreen = () => {
  
    const navigation = useNavigation();
  
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
  
    React.useEffect(() => {
      
      auth.onAuthStateChanged(user => {
        
          const unsubscribe = auth.onAuthStateChanged(user => {
            if(user){
             navigation.navigate("Driver",{user:"ola mundo",email:"ola mundo 2 para pruebas"}); 
            }
            setEmail("");
            setPassword("");
          });
  
          return unsubscribe;
      })
    } ,[])
  
    const handleLogin = () => {
        console.log(email);
        console.log(password);
      signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    
      // Signed in
      const user = userCredential.user;
      navigation.navigate("User");
      // ...
    })
    .catch((error) => {
      console.log(error);
    });
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
        <View style={styles.inputContainer}>
          
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
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
          <TouchableOpacity onPress={handleCreateAccount} style={styles.button}>
            <Text style={styles.buttonOurlineText}>Register</Text>
          </TouchableOpacity>
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
    },
    inputContainer: {},
    input: {},
    buttonOurlineText:{},
    buttonContainer: {},
    button: {},
    buttonText: {},
    
  });