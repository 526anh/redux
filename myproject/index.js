/* eslint-disable prettier/prettier */
/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';



// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {currentScreen: 'Splash'};
//     setTimeout(() => {
//       this.setState({currentScreen: 'Login'});
//     }, 3000);
//   }
//   render() {
//     const {currentScreen} = this.state;
//     let mainScreen = currentScreen === 'Splash' ? <Splash /> : <Login />;
//     return mainScreen;
//   }
// }

AppRegistry.registerComponent(appName, () => App);
