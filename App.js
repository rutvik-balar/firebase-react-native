import React from 'react';
import Google from './src/Google';
import Twitter from './src/Twitter';
import OnClicknotification from './src/OnClicknotification';
import PushNotification from './src/PushNotification';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import Hooks from './src/Hooks';
import Hooks2 from './src/Hooks2';
import ImagePickers from './src/ImagePickers';
import TesttoSpeach from './src/TesttoSpeach';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Google" component={Google} />
        <Stack.Screen name="Twitter" component={Twitter} />
        <Stack.Screen name="PushNotification" component={PushNotification} />
        <Stack.Screen name="OnClicknotification" component={OnClicknotification} />
        <Stack.Screen name="Hooks" component={Hooks} />
        <Stack.Screen name="Hooks2" component={Hooks2} />
        <Stack.Screen name="ImagePickers" component={ImagePickers} />
        <Stack.Screen name="TesttoSpeach" component={TesttoSpeach} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
