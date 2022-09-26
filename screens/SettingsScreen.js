import { View, Text } from 'react-native'
import React from 'react'

const SettingsScreen = () => {
  const [mytime, setMytime] = React.useState(0);

  React.useEffect(() => {
    // create a interval and get the id
    const myInterval = setInterval(() => {
      setMytime((prevTime) => prevTime + 1);
      
    }, 1000);
    // clear out the interval using the id when unmounting the component
    return () => clearInterval(()=>{myInterval});

  }, []);


  return (
    <View>
      <Text>{mytime}</Text>
    </View>
  )
}

export default SettingsScreen