/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

class Home extends Component  {
  constructor(props){
    super(props);
    this.state = {
      token: '',
    };
  }
  _onClick = async () => {
    axios
      .post('http://192.168.1.42:3000/submit',{
        token: this.props.route.params,
      })
      .then((response) => {
        if(response.data.result === 1){
          Alert.alert('success.');
        }else {
          this.props.navigation.navigate('Home',{err:1});
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { data } = this.props.route.params;
    return (
      <View style={styles.container}>
        <Text>data: {data}</Text>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._onClick}>
          <Text style={styles.txtbutton}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


// function Home ({navigation, route}) {
//   //render() {
//     const data = route.params.data.token;
//     return (
//       <View style={styles.container}>
//         <Text>{JSON.stringify(data)}</Text>
//         <TouchableOpacity
//           style={styles.buttonContainer}
//           onPress={() => this.props.navigation.navigate('Login')}>
//           <Text style={styles.txtbutton}>SUBMIT</Text>
//         </TouchableOpacity>
//       </View>
//     );
//  // }
// }
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  buttonContainer: {
    marginTop:100,
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

export default Home;
