import React from 'react';
React.createContext('light');
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import * as firebase from 'firebase/app';
import 'firebase/auth';


export default class SignInScreen extends React.Component {
  state = {
    email: '',
    password: ''
  };

  handleSubmit = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
      })
      .catch(function(error) {
        console.log(error.code);
      });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User is signed in.');
      } else {
        console.log('User is signed out');
      }
    });
    this.setState({ email: '', password: '' });
  };

  render() {
    const { password, email } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Sign in</Text>
        <TextInput
          style={styles.textInput}
          returnKeyLabel="next"
          placeholder="Email"
          keyboardType="email-address"
          maxLength={40}
          value={email}
          onChangeText={email => this.setState({ email })}
          underlineColorAndroid={'transparent'}
        />
        <TextInput
          style={styles.textInput}
          returnKeyLabel="next"
          placeholder="Password"
          maxLength={40}
          value={password}
          secureTextEntry={true}
          onChangeText={password => this.setState({ password })}
          underlineColorAndroid={'transparent'}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={this.handleSubmit}
        >
          <Text style={styles.btntext}>SIGN IN</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#CA7E8D',
    paddingLeft: 60,
    paddingRight: 60
  },
  regform: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 25,
    color: 'white',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: 'white',
    borderBottomWidth: 2
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    padding: 10,
    marginBottom: 10,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E6B655',
    marginTop: 20,
    marginBottom: 90
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold'
  }
});
