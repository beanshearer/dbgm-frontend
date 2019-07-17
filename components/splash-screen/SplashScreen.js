import React from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>nearBy</Text>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../logos/logo-transparent-background.png')}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('RegisterScreen')}
        >
          <Text style={styles.btntext}>CREATE NEW ACCOUNT</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate('SignInScreen')}
        >
          <Text style={styles.btntext}>SIGN IN</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: '#ADDDCE',
    paddingLeft: 60,
    paddingRight: 60
  },
  header: {
    fontSize: 30,
    color: '#9E280E',
    textAlign: 'center',
    paddingBottom: 10,
    fontWeight: 'bold',
    marginBottom: 40
  },
  inputContainer: {
    paddingTop: 15
  },

  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#9E0E28',
    marginTop: 30
  },
  btntext: {
    color: 'white',
    fontWeight: 'bold'
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 200,
    height: 200
  }
});
