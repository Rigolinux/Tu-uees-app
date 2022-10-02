import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorMain from './src/navigation/NavigatorMain';

//redux components
import { store } from './src/redux/store';
import { Provider } from 'react-redux'

export default function App() {
  return (
    <>
    <Provider store={store}>
      
     <NavigatorMain /> 
    </Provider>
    </>
    
  );
}

