/* eslint-disable prettier/prettier */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Login from './Login';
import Home from './Home';

const DemoNavigation = StackNavigator({
    LoginScreen: {
        screen: Login,
      },
    HomeScreen: {
      screen: Home,
    },
  });
  export default DemoNavigation;


