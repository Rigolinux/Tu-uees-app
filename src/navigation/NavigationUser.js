import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


//srceens
import HomeScreen from "../../screens/DualScreen/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";

import NavigationScreen from "../../screens/UserScreen/NavigationUserScreen";
import SchedulesScreen from "../../screens/DualScreen/SchedulesScreen";

//icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

//firebase

const Tab = createBottomTabNavigator();


function MyTabs() {
  React.useState(() => {
   
  },[]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
          headerShown: false,
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color }) => (
              <FontAwesome name="user-circle" size={24} color="black" />
          ),
          tabBarBadge: 3,
        }
      }
      
      component={HomeScreen} />
      <Tab.Screen name="Settings"
      options={
        {
          headerShown: false,
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" size={24} color="black" />
          ),
          tabBarBadge: 3,
        }
      }
      component={SettingsScreen} />
      {/* <Tab.Screen name="Navigation" 
      options={{
        headerShown: false,
        tabBarLabel: "Navegación",
        tabBarIcon: ({ color }) => (
          <Entypo name="location" size={24} color="black" />
        ),
        tabBarBadge: 3,
      }}
      component={NavigationScreen} 
      /> */}
      <Tab.Screen name="Schedules" 
      options={{
        headerShown: false,
        tabBarLabel: "Horarios",
        tabBarIcon: ({ color }) => (
          <FontAwesome name="calendar" size={24} color="black" />
        ),
        tabBarBadge: 3,
      }}
      component={SchedulesScreen} />
    </Tab.Navigator>
  );
}
export default Navigation = () => {
  return (
    
      <MyTabs />
    
  );
};
