import { View, Text } from 'react-native'
import React from 'react'

import { useSelector,useDispatch } from 'react-redux';
import {getDestinationFromDatabase} from '../src/redux/states/travel/destination';

const SettingsScreen = () => {
    const dispatch = useDispatch();
    const destination = useSelector((state) => {state.destination});
  React.useEffect(() => {
    dispatch(getDestinationFromDatabase());
    console.log(destination);
  }, []);


  return (
    <View>
      <Text>Hola</Text>
    </View>
  )
}

export default SettingsScreen