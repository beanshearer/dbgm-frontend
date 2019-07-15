import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

class CreateAccount extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    email: ''
  };
  render() {
    const { name, password, username, email } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Register</Text>
        <TextInput
          style={styles.textInput}
          placeholder="E-mail"
          onChangeText={email => this.setState({ email })}
          value={email}
          underlineColorAndroid={'transparent'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Name"
          onChangeText={name => this.setState({ name })}
          value={name}
          underlineColorAndroid={'transparent'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={username => this.setState({ username })}
          value={username}
          underlineColorAndroid={'transparent'}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={password}
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
        />
        <TouchableOpacity style={styles.button} onPress={this._onPressButton}>
          <Text style={styles.btntext}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    );
  }

  PostUser = () => {
    return fetch('https://api.github.com/gists', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingLeft: 60,
    paddingRight: 60
  },
  regform: {
    alignSelf: 'stretch'
  },
  header: {
    fontSize: 19,
    color: 'white',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: 'red',
    borderBottomWidth: 1
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 10,
    color: 'white',
    borderBottomColor: 'red',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'green',
    marginTop: 30
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold'
  }
});

export default CreateAccount;
