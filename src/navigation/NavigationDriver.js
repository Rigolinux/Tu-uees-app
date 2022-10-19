import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens for the bottom tab navigator
import HomeScreen from '../../screens/DualScreen/HomeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import NavigatorDriverScreen from '../../screens/DriverScreen/NavigatorDriverScreen';
import SchedulesScreen from '../../screens/DriverScreen/SchedulesDriverScreen';

//icons 

import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


//import colors
import { colors } from '../../utils/colors';


const NavigationDriver = () => {

  const Nav = createBottomTabNavigator();
  
  


 
  return (
    <Nav.Navigator
    initialRouteName='Home'
    activeColor="blue"
      inactiveColor="#ff0b0b"
      screenOptions={
        {

          tabBarActiveBackgroundColor:    "#a9a9a9",
          // tabBarInactiveBackgroundColor:  "#ff0b0b",
          // text color inactive bottom tab
          tabBarInactiveTintColor:      colors.six,

          //text color active bottom tab
          tabBarActiveTintColor:        colors.six,
          tabBarStyle:{
            
            //background of the tab bar
            backgroundColor:            colors.three,
          }
        }
      } >
    
      <Nav.Screen name="Home"
      options={
        {
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle" size={24} color="black" />
          ),
         
          }
          
      }
      component={HomeScreen} />

      <Nav.Screen name="Settings"
      options={
        {
          headerShown: false,
          tabBarLabel: "Personalizar",
          tabBarIcon: ({ color }) => (
              <Feather name="tool" size={24} color="black" />
          ),
          
          }
          
      }

       component={SettingsScreen} />

      

      <Nav.Screen 
      name="SchedulesDriver" 
      options={{
        headerShown: false,
        tabBarLabel: "Mis viajes",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="bus" size={24} color="black" />
        ),
      
      }}
      
      component={SchedulesScreen} />
    </Nav.Navigator>
  )
}

export default NavigationDriver