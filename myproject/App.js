/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login';
import Home from './components/Home';

const Stack = createStackNavigator();

function App({ navigation }) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        //options={{ title: 'Login' }}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;


