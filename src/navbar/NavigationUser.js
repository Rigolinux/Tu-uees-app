import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//srceens
import HomeScreen from "../../screens/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import StackScreen from "../../screens/StackScreen";
import NavigationScreen from "../../screens/NavigationScreen";
import SchedulesScreen from "../../screens/SchedulesScreen";

//icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Settings"
      activeColor="#45f32a"
      inactiveColor="#ff0b0b"
      screenOptions={
        {

          tabBarActiveBackgroundColor: "#45f32a",
          tabBarInactiveBackgroundColor: "#ff0b0b",
          // text color inactive bottom tab
          tabBarInactiveTintColor: '#1a0bff',

          //text color active bottom tab
          tabBarActiveTintColor: '#ff0b0b',
          tabBarStyle:{
            
            //background of the tab bar
            backgroundColor: '#45f32a',
          }
        }
      }
      >
      <Tab.Screen 
      name="Home" 
      options={
        {
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" size={24} color="black" />
          ),
          tabBarBadge: 3,
        }
      }
      
      component={HomeScreen} />
      <Tab.Screen name="Settings"
      options={
        {
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
          ),
        }
      }
      component={SettingsScreen} />
      <Tab.Screen name="Navigation" 
      options={{
        tabBarLabel: "Navegación",
        tabBarIcon: ({ color }) => (
          <Entypo name="location" size={24} color="black" />
        ),
      }}
      component={NavigationScreen} 
      />
      <Tab.Screen name="Schedules" 
      options={{
        tabBarLabel: "Horarios",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="calendar" size={24} color="black" />
        ),
      }}
      component={SchedulesScreen} />
    </Tab.Navigator>
  );
}
export default Navigation = () => {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
};
