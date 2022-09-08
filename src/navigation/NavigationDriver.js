import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens for the bottom tab navigator
import HomeScreen from '../../screens/DualScreen/HomeScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import NavigatorDriverScreen from '../../screens/DriverScreen/NavigatorDriverScreen';
import SchedulesScreen from '../../screens/DualScreen/SchedulesScreen';
const NavigationDriver = () => {

  const Nav = createBottomTabNavigator();

  return (
    <Nav.Navigator
    
    >
      <Nav.Screen name="Home" component={HomeScreen} />
      <Nav.Screen name="Settings" component={SettingsScreen} />
      <Nav.Screen name="Navigation" component={NavigatorDriverScreen} />
      <Nav.Screen name="Schedules" component={SchedulesScreen} />
    </Nav.Navigator>
  )
}

export default NavigationDriver