import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Text>HOME</Text>,
      headerLeft: (
        <TouchableOpacity onPress={() => { navigation.navigate('AllChannels') }}>
          <Image source={require('../../logos/logo-transparent-background.png')} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
      ),
      headerRight: (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => { navigation.navigate('AccountManagementScreen') }}>
            <Image source={require('../../buttons/account-info.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('CaptureScreen') }}>
            <Image source={require('../../buttons/camera.png')} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      ),
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>NearBy</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF'
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold'
  },
  inputContainer: {
    paddingTop: 15
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  }
});
