var cors = require('cors')
var mongodb = require('mongodb')
var ObjectID = mongodb.ObjectID
const express = require('express')
const app = express()
app.use(cors())
const port = 3000
var bodyParser = require('body-parser')
const {response} = require('express')
const {request} = require('http')
var jwt = require('jsonwebtoken')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

// create MongoBD client
var MongoClient = mongodb.MongoClient
// connect url DB
var url = 'mongodb://localhost:27017'
var connect_db;
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err, client) {
    if (err) {
        console.log('Unable to connect to MongoDB', err)
    } else {
        connect_db = client.db('logindb');
    }
})

// Register router
app.post('/register', function (req, res) {
    var post_data = req.body

    res.send(post_data)

    var email = post_data.email
    var password = post_data.password

    var insertJson = {
        'email': email,
        'password': password
    }

    connect_db.collection('users').find({'email': email}).toArray((error, result) => {
        if (error) {
            res.send("Error")
        } else {
            connect_db.collection('users').insertOne(insertJson, function (err, result) { // res.send('Reg success')
                console.log('Reg success')
            })
        }
    })
})

// router login
app.post('/login', (req, res) => {
    var post_data = req.body

    var email = post_data.email
    var password = post_data.password

    connect_db.collection('users').find({'email': email}).count(function (err, number) {
        if (number === 0) {
            res.json('Email not exists')
            console.log('Email not exists')
        } else { // authentication
            connect_db.collection('users').findOne({
                'email': email
            }, function (err, users) {
                if (users.email == email && users.password == password) { // res.json({"success":1,"email":email,"password":password})
                    var token = jwt.sign({
                        Name: 'testName'
                    }, '7777', {
                        algorithm: 'HS256',
                        expiresIn: '3m'
                    })
                    res.json({access_token: token, 'statusLogin': 'OK'})
                    console.log('login success.')
                } else {
                    res.json({"success": 0, "email": email, "password": password})
                    console.log('Wrong password')
                }
            })
        }
    })
})

// Middleware
app.use((req, res, next) => { // console.log('%O', req);
    next();
});

// root router
app.get('/', (req, res) => {
    res.send('Hello World!')
    console.log('======Have a The Get Request')
    //     console.log(req.body)
    //     res.send({'abc':'Hello World!'})
})

app.listen(port, () => console.log('Example app listening at http://localhost:${port}'))


import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
// import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import APIKit, {setClientToken} from '../../../shared/APIKit';
import AsyncStorage from '@react-native-community/async-storage';

class LoginViews extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    isAuthorized: false,
    show: 'Default',
  };

  componentDidMount() {
    this.getData().then((rs) => {
      if (rs != null) {
        this.props.navigation.navigate('Notice');
      }
    });
  }

  handleemailChange = (email) => {
    this.setState({email, show: ''});
  };

  handlePasswordChange = (password) => {
    this.setState({password, show: ''});
  };

  // // For access_token into Key Store data.access_token
  storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      return '***isSaved: ' + jsonValue;
    } catch (e) {
      // saving error
      console.log(e);
      return 'notIsSaved';
    }
  };
  // get access_token
  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  onPressLogin = () => {
    // const {email, password} = this.state;
    // const payload = {email, password};
    // 1. call login api
    APIKit.post('/login/', {
      email: this.state.email,
      password: this.state.password,
    })
      .then((rs) => {
        console.log(
          '1. LoginView - call login api | res isLoggined: ' +
            rs.data.isLoggined,
        );
        this.setState({show: rs.data.access_token});
        return rs.data.access_token;
      })
      .then((rs) => {
        console.log('2. LoginView - storeData: ' + rs);
        return this.storeData(rs);
      })
      .then((rs) => {
        // move to NoticeView
        console.log('3. LoginView - move to NoticeView');
        this.props.navigation.navigate('Notice');
      })
      .catch((error) => {
        console.log('reject - onPressLogin ' + error);
        this.setState({
          isAuthorized: false,
          show: 'Wrong password',
        });
      });
  };

  // render
  render() {
    const {isLoading} = this.state;

    return (
      <View style={styles.containerStyle}>
        <Spinner visible={isLoading} />
        <View>
          <View style={styles.logotypeContainer}>
            <Image
              source={require('../../../assets/images/logo/touchbase-logo.png')}
              style={styles.logotype}
            />
          </View>
          <Text style={styles.errorMessageTextStyle}>{this.state.show}</Text>
          <TextInput
            style={styles.input}
            value={this.state.email}
            maxLength={256}
            placeholder="Enter email..."
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            onSubmitEditing={(event) =>
              this.passwordInput.wrappedInstance.focus()
            }
            onChangeText={this.handleemailChange}
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />

          <TextInput
            ref={(node) => {
              this.passwordInput = node;
            }}
            style={styles.input}
            value={this.state.password}
            maxLength={40}
            placeholder="Enter password..."
            onChangeText={this.handlePasswordChange}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            blurOnSubmit
            onSubmitEditing={this.onPressLogin.bind(this)}
            secureTextEntry
            underlineColorAndroid="transparent"
            placeholderTextColor="#999"
          />
<TouchableOpacity
            style={styles.loginButton}
            onPress={this.onPressLogin.bind(this)}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Reg')}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => this.props.navigation.navigate('Notice')}>
            <Text style={styles.loginButtonText}>Home - Notice</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const utils = {
  colors: {primaryColor: '#af0e66'},
  dimensions: {defaultPadding: 12},
  fonts: {largeFontSize: 18, mediumFontSize: 16, smallFontSize: 12},
};

const styles = {
  innerContainer: {
    marginBottom: 32,
  },
  logotypeContainer: {
    alignItems: 'center',
  },
  logotype: {
    maxWidth: 280,
    maxHeight: 100,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
  },
  input: {
    height: 50,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    marginBottom: utils.dimensions.defaultPadding,
  },
  loginButton: {
    borderColor: utils.colors.primaryColor,
    borderWidth: 2,
    padding: utils.dimensions.defaultPadding,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  loginButtonText: {
    color: utils.colors.primaryColor,
    fontSize: utils.fonts.mediumFontSize,
    fontWeight: 'bold',
  },
  errorMessageContainerStyle: {
    marginBottom: 8,
    backgroundColor: '#fee8e6',
    padding: 8,
    borderRadius: 4,
  },
  errorMessageTextStyle: {
    color: '#db2828',
    textAlign: 'center',
    fontSize: 12,
  },
};

export default LoginViews;