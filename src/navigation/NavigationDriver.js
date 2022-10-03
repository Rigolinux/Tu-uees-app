import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens for the bottom tab navigator
import HomeScreen from '../../screens/DualScreen/HomeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import NavigatorDriverScreen from '../../screens/DriverScreen/NavigatorDriverScreen';
import SchedulesScreen from '../../screens/DualScreen/SchedulesScreen';

//icons 
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//redux components
import { useSelector, useDispatch } from 'react-redux'



const NavigationDriver = () => {

  const Nav = createBottomTabNavigator();
  
  


 
  return (
    <Nav.Navigator
    initialRouteName='Home'

    >
      <Nav.Screen name="Home"
      options={
        {
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle" size={24} color="black" />
          ),
          tabBarBadge: 3,
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

      {/* <Nav.Screen 
      name="Navigation" 
      options={{
        headerShown: false,
        tabBarLabel: "Navegación",
        tabBarIcon: ({ color }) => (
          <Entypo name="location" size={24} color="black" />
        ),
      
       
      }}
    
      component={NavigatorDriverScreen} 
      /> */}

      <Nav.Screen 
      name="Schedules" 
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