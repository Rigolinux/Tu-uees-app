import { View, Text,Button,StyleSheet,  } from 'react-native'
import React from 'react'
import Constants from 'expo-constants';
//redux components
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from './states/testStore'

//navigation
import { useNavigation } from "@react-navigation/native";

export default function Counter() {
    const count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    
   
      
    
  return (
    <View>
      <View style={styles.Topm}>
        <Button
          
          aria-label="Increment value"
          onPress={() => dispatch(increment())}
          title='Increment'
          
        >
          
        </Button>
        <Text>{count}</Text>
        <Button
          aria-label="Decrement value"
          onPress={() => dispatch(decrement())}
          title='Decrement'
        >
          
        </Button>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
    Topm: {
        marginTop: Constants.statusBarHeight,
    
      }
    
})
