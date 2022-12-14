import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut } from "firebase/auth";
import {auth} from '../../backend/firebase';

import LoginScreen from '../../screens/DualScreen/LoginScreen';
import NavigationUser from './NavigationUser';
import StackScreen from '../../screens/DualScreen/ChanguePasswordScreen';
import NavigationDriver from './NavigationDriver';

const Stack = createNativeStackNavigator();

export default function NavigatorMain() {

 

    return (
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Login" component={LoginScreen} />
        <Stack.Screen name="User" options={{headerShown: false}} component={NavigationUser} />
        <Stack.Screen name="ChangePassword" options={{headerShown: false}} component={StackScreen} /> 
        <Stack.Screen name= "Driver" options={{headerShown: false}} component={NavigationDriver} />
      </Stack.Navigator>
    </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });