import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import NavigatorMain from './src/navigation/NavigatorMain';

//redux components
import { store } from './src/redux/store';
import { Provider } from 'react-redux'
import Counter from './src/redux/redux-test';
export default function App() {
  return (
    <>
    <Provider store={store}>
      
     <NavigatorMain /> 
    </Provider>
    </>
    
  );
}

