import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//srceens
import HomeScreen from "../../screens/DualScreen/HomeScreen";
import SettingsScreen from "../../screens/SettingsScreen";

import NavigationScreen from "../../screens/UserScreen/NavigationUserScreen";
import SchedulesScreen from "../../screens/UserScreen/SchedulesScreen";

//icons
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

import { colors } from "../../utils/colors";

//firebase

const Tab = createBottomTabNavigator();


function MyTabs() {
  React.useState(() => {
   
  },[]);

  return (
    <Tab.Navigator
      initialRouteName="Home"
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
      <Tab.Screen 
      name="Home" 
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
      <Tab.Screen name="Settings"
      options={
        {
          headerShown: false,
          tabBarLabel: "Ajustes",
          tabBarIcon: ({ color }) => (
            <Feather name="tool" size={24} color="black" />
          ),
          
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
      <Tab.Screen name="SchedulesUser" 
      options={{
        headerShown: false,
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
    
      <MyTabs />
    
  );
};
