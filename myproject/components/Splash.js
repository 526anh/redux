import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
export default class Splash extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/splash_icon.png')}
          />
        </View>
        <Text style={styles.title}>REACT NATIVE</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F4F4F',
    flex: 1,
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    marginBottom: 200,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});
