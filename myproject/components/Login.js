/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
    };
  }
  _onLogin = async () => {
    axios
      .post('http://192.168.1.42:3000/login', {
        name: this.state.name,
        password: this.state.password,
      })
      .then((response) => {
        var token = response.data.access_token;
        AsyncStorage.setItem(
          'token',
          token,
          // () => {
          //   AsyncStorage.mergeItem(
          //     'token',
          //     token,
          //     () => {
          //       AsyncStorage.getItem('token', (err, result) => {
          //         //Alert.alert(result);
          //       });
          //     }
          //   );
          // }
        );

        if (response.data.result === 1) {
          this.props.navigation.navigate('Home',{data: token});
          //Alert.alert('Login success.');
        } else {
          Alert.alert('Login fail.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.header}>LOGIN</Text> */}
        <TouchableWithoutFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}>
          <View style={styles.txtinput}>
            <TextInput
              style={styles.input}
              placeholder="Name:"
              placeholderTextColor="rgba(255,255,255,0.5)"
              returnKeyType="next"
              autoCorrect={false}
              // eslint-disable-next-line react/no-string-refs
              onSubmitEditing={() => this.refs.txtPassword.focus()}
              onChangeText={(text) => {
                this.setState({name: text});
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password:"
              placeholderTextColor="rgba(255,255,255,0.5)"
              returnKeyType="go"
              secureTextEntry={true}
              autoCorrect={false}
              //ref={'txtPassword'}
              onChangeText={(text) => {
                this.setState({password: text});
              }}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._onLogin}>
          <Text style={styles.txtbutton}>SIGN IN</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}>
          <Text style={styles.txtbutton}>SIGN UP</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4F4F',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  txtinput: {
    marginTop: 50,
  },
  input: {
    backgroundColor: '#204F6A',
    width: 300,
    fontSize: 18,
    margin: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgb(0,128,128)',
    width: 150,
    height: 40,
    margin: 15,
    borderRadius: 5,
  },
  txtbutton: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    fontWeight: 'bold',
  },
});

export default Login;
